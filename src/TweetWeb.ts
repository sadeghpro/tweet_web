import Tweet from "./Tweet";
import puppeteer, { Browser, PuppeteerLaunchOptions } from "puppeteer";

export default class TweetWeb {

    browser?: Browser;

    static create = async (options: PuppeteerLaunchOptions = {}): Promise<TweetWeb> => {
        const tweetWeb = new TweetWeb();
        tweetWeb.browser = await puppeteer.launch(options);
        return tweetWeb;
    }


    getPost= async (link: string, timeout: number = 10000): Promise<Tweet> => {
        if (!this.browser) {
            this.browser = (await TweetWeb.create()).browser!
        }
        const page = await this.browser.newPage();
        await page.goto(link, {
            timeout,
        });
        await page.waitForSelector('article')
        const tweetElement = await page.$('article');
        const tweetTextElement = await tweetElement?.$('div[data-testid="tweetText"]')
        const text = await page.evaluate(elm => elm.textContent, tweetTextElement!);
        page.close();
        return new Tweet(text ?? '');
    }


}