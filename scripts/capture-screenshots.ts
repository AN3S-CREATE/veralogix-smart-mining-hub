import { chromium } from "playwright";
import fs from "fs/promises";
import path from "path";
import process from "process";

const BASE_URL = process.env.BASE_URL;
const SITEMAP_URL = process.env.SITEMAP_URL;
const ROUTES_FILE = process.env.ROUTES_FILE;
const OUTPUT_DIR = process.env.OUTPUT_DIR ?? "screenshots";
const MAX_PAGES = Number(process.env.MAX_PAGES ?? 200);
const WAIT_AFTER_LOAD_MS = Number(process.env.WAIT_AFTER_LOAD_MS ?? 0);
const NAVIGATION_TIMEOUT_MS = Number(process.env.NAVIGATION_TIMEOUT_MS ?? 45000);
const CRAWL_LINKS = process.env.CRAWL_LINKS !== "false";

if (!BASE_URL) {
  throw new Error("BASE_URL is required. Example: https://your-app-url.com");
}

const normalizedBase = new URL(BASE_URL);
normalizedBase.hash = "";

const isSameOrigin = (url: URL) => url.origin === normalizedBase.origin;

const sanitizeSegment = (value: string) =>
  value
    .replace(/\/+$/, "")
    .replace(/[^a-zA-Z0-9-_]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 200);

const filenameForUrl = (url: URL) => {
  const pathname = url.pathname === "/" ? "home" : url.pathname.replace(/^\//, "");
  const pathPart = sanitizeSegment(pathname.replace(/\//g, "__")) || "home";
  const searchPart = url.search ? sanitizeSegment(url.search.replace(/^\?/, "")) : "";
  const name = searchPart ? `${pathPart}__${searchPart}` : pathPart;
  return `${name}.png`;
};

const readRoutesFile = async () => {
  if (!ROUTES_FILE) return [];
  const fileContent = await fs.readFile(ROUTES_FILE, "utf-8");
  return fileContent
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith("#"));
};

const readSitemap = async () => {
  if (!SITEMAP_URL) return [];
  const response = await fetch(SITEMAP_URL);
  if (!response.ok) {
    throw new Error(`Failed to fetch sitemap: ${response.status} ${response.statusText}`);
  }
  const body = await response.text();
  const matches = [...body.matchAll(/<loc>([^<]+)<\/loc>/g)];
  return matches.map((match) => match[1]);
};

const resolveUrl = (routeOrUrl: string) => {
  try {
    const url = new URL(routeOrUrl, normalizedBase);
    url.hash = "";
    return url;
  } catch {
    return null;
  }
};

const crawl = async () => {
  await fs.mkdir(OUTPUT_DIR, { recursive: true });

  const [routes, sitemapUrls] = await Promise.all([readRoutesFile(), readSitemap()]);
  const startingPoints = [...routes, ...sitemapUrls];
  const queue = new Array<string>();
  const visited = new Set<string>();
  const failed = new Array<string>();

  if (startingPoints.length === 0) {
    queue.push(normalizedBase.toString());
  } else {
    startingPoints.forEach((entry) => {
      const url = resolveUrl(entry);
      if (url && isSameOrigin(url)) {
        queue.push(url.toString());
      }
    });
  }

  const browser = await chromium.launch();
  const page = await browser.newPage();
  page.setDefaultNavigationTimeout(NAVIGATION_TIMEOUT_MS);

  while (queue.length > 0 && visited.size < MAX_PAGES) {
    const current = queue.shift();
    if (!current || visited.has(current)) {
      continue;
    }

    visited.add(current);

    try {
      await page.goto(current, { waitUntil: "networkidle" });
      if (WAIT_AFTER_LOAD_MS > 0) {
        await page.waitForTimeout(WAIT_AFTER_LOAD_MS);
      }

      const url = new URL(current);
      const filename = filenameForUrl(url);
      const outputPath = path.join(OUTPUT_DIR, filename);
      await page.screenshot({ path: outputPath, fullPage: true });

      if (CRAWL_LINKS) {
        const links = await page.$$eval("a[href]", (anchors) =>
          anchors
            .map((anchor) => anchor.getAttribute("href") || "")
            .filter(Boolean)
        );
        links.forEach((href) => {
          const resolved = resolveUrl(href);
          if (!resolved || !isSameOrigin(resolved)) {
            return;
          }
          const normalized = resolved.toString();
          if (!visited.has(normalized)) {
            queue.push(normalized);
          }
        });
      }
    } catch (error) {
      console.error(`Failed to capture ${current}`, error);
      failed.push(current);
    }
  }

  await browser.close();

  console.log(`Captured ${visited.size - failed.length} pages.`);
  if (failed.length > 0) {
    console.log(`Failed to capture ${failed.length} pages:`);
    failed.forEach((url) => console.log(`- ${url}`));
  }
};

crawl().catch((error) => {
  console.error(error);
  process.exit(1);
});
