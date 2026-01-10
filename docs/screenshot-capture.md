# Automated Screenshot Capture (External)

This solution captures screenshots of your live web application without modifying the app itself. It uses a headless Chromium browser (Playwright) to crawl routes and save full-page screenshots.

## What it does

- Navigates your live app externally (no UI changes, no injected scripts).
- Crawls routes from:
  - a sitemap URL,
  - a plain-text routes file,
  - or the base URL if neither is provided.
- Captures a full-page screenshot per route.
- Produces a zip file with all screenshots via GitHub Actions.

## How route discovery works

The script uses three inputs (highest priority first):

1. **`ROUTES_FILE`** (plain-text file, one path or URL per line)
2. **`SITEMAP_URL`** (XML sitemap with `<loc>` entries)
3. **`BASE_URL`** only (starts from the home page and crawls internal links)

You can use any combination of these to control the crawl.

## Script usage (local)

```bash
BASE_URL="https://your-app-url.com" \
SITEMAP_URL="https://your-app-url.com/sitemap.xml" \
ROUTES_FILE="routes.txt" \
MAX_PAGES=200 \
OUTPUT_DIR="screenshots" \
WAIT_AFTER_LOAD_MS=1000 \
NAVIGATION_TIMEOUT_MS=45000 \
npm run screenshots:capture
```

### Routes file format

```text
/
/about
/docs/getting-started
https://your-app-url.com/pricing
```

Lines starting with `#` are ignored.

## GitHub Actions workflow

Trigger the workflow manually from **Actions → Capture App Screenshots** and provide:

- **base_url** (required)
- **sitemap_url** (optional)
- **routes_file** (optional, e.g., `docs/routes.txt`)
- **max_pages** (optional)

The workflow will upload `screenshots.zip` as a GitHub Actions artifact.

## Output

Screenshots are saved to the `screenshots/` folder with filenames that match the route name (e.g., `docs__getting-started.png`).
