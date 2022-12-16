import puppeteer from "puppeteer";

(async () => {
  const browser = await puppeteer.launch({
    defaultViewport: false,
    headless: false,
    slowMo: 250,
  });

  const page = await browser.newPage();

  await page.goto(
    "https://www.linkedin.com/learning/excel-lookup-functions-in-depth?upsellOrderOrigin=default_guest_learning&trk=homepage-learning_trending-courses_related-content-card"
  );

  const chapterContainer = await page.$$(".show-more-less");

  chapterContainer.forEach(async (container) => {
    const containerChapterTitle = await page.evaluate(
      (el) =>
        el.querySelector(
          "button.show-more-less__button.show-more-less__more-button.show-more-less-button"
        ).innerText,
      container
    );

    const videoTitleElems = await container.$$(
      "ul .table-of-contents__item-title"
    );

    const videoTitlePromises = videoTitleElems.map(async (elem) => {
      const videoTitle = await page.evaluate((el) => el.innerText, elem);
      return videoTitle.trim();
    });

    const videoTitles = await Promise.all(videoTitlePromises);

    console.log({
      chapterTitle: containerChapterTitle,
      videos: videoTitles,
    });
  });
})();
