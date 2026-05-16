const fs = require("fs");
const path = require("path");
const { pathToFileURL } = require("url");
const { chromium } = require("playwright");

const root = path.resolve(__dirname, "..");
const outputDir = path.join(root, "previews");
const screens = ["overview", "heat", "flood", "assets", "scenario", "reports"];

async function main() {
  fs.mkdirSync(outputDir, { recursive: true });

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({
    viewport: { width: 1440, height: 980 },
    deviceScaleFactor: 1,
  });

  const url = pathToFileURL(path.join(root, "index.html")).href;

  for (const screen of screens) {
    await page.goto(url, { waitUntil: "networkidle" });
    if (screen !== "overview") {
      await page.click(`[data-screen="${screen}"]`);
    }
    await page.screenshot({
      path: path.join(outputDir, `aurcap-${screen}.png`),
      fullPage: true,
    });
  }

  await browser.close();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
