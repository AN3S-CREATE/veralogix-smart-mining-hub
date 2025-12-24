
/**
 * @fileoverview This script scans the codebase for blacklisted terms to ensure old
 * feature names are removed. It fails the build if any matches are found.
 */

import fs from 'fs';
import path from 'path';

const BLACKLIST_FILE = path.resolve(__dirname, 'name-blacklist.json');
const SRC_DIR = path.resolve(__dirname, '../src');

/**
 * Recursively get all file paths from a directory.
 * @param dir The directory to scan.
 * @returns An array of file paths.
 */
function getFilePaths(dir: string): string[] {
  const dirents = fs.readdirSync(dir, { withFileTypes: true });
  const files = dirents.map((dirent) => {
    const res = path.resolve(dir, dirent.name);
    return dirent.isDirectory() ? getFilePaths(res) : res;
  });
  return Array.prototype.concat(...files);
}

/**
 * Main function to run the scan.
 */
async function main() {
  console.log('🔍 Starting name scan...');

  // 1. Read blacklist
  if (!fs.existsSync(BLACKLIST_FILE)) {
    console.error(`❌ Blacklist file not found at ${BLACKLIST_FILE}`);
    process.exit(1);
  }
  const blacklist: string[] = JSON.parse(fs.readFileSync(BLACKLIST_FILE, 'utf-8'));
  const blacklistRegex = new RegExp(blacklist.join('|'), 'i'); // Case-insensitive regex

  // 2. Get all file paths
  const allFiles = getFilePaths(SRC_DIR);
  const relevantFiles = allFiles.filter(file =>
    /\.(tsx|ts|jsx|js|json)$/.test(file) && !file.includes('service-catalog.ts')
  );

  let matchesFound = false;

  // 3. Scan each file
  for (const file of relevantFiles) {
    const content = fs.readFileSync(file, 'utf-8');
    const match = content.match(blacklistRegex);

    if (match) {
      matchesFound = true;
      console.error(`❌ Found blacklisted term "${match[0]}" in file: ${path.relative(process.cwd(), file)}`);
    }
  }

  // 4. Report result
  if (matchesFound) {
    console.error('\n🚨 Scan failed. Please remove the old service/feature names listed above.');
    process.exit(1);
  } else {
    console.log('\n✅ Name scan complete. No blacklisted terms found.');
    process.exit(0);
  }
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
