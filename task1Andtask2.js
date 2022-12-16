import puppeteer from "puppeteer";
import config from "dotenv";
config.config();

(async () => {
  const browser = await puppeteer.launch({
    defaultViewport: false,
    headless: false,
  });
  const page = await browser.newPage();

  await page.goto("https://www.facebook.com/", {
    waitUntil: "networkidle0",
  });

  await page.type("#email", process.env.USERNAME);
  await page.type("#pass", process.env.PASSWORD);
  await page.click("button._42ft._4jy0._6lth._4jy6._4jy1.selected._51sy");
  await page.waitForNavigation();

  const cookies = await page.cookies();
  const context = await browser.createIncognitoBrowserContext();
  const page2 = await context.newPage();
  await page2.setCookie(...cookies);
  await page2.goto("https://www.facebook.com/");
})();
