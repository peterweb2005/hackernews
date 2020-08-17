import * as fs from 'fs';
import * as cheerio from 'cheerio';
import { Browser, Page, launch } from 'puppeteer';
import { Logger } from "tslog";

type OnPage = (page: Page) => Promise<any>;

type ClientOptions = {
  //
  writeFile?: boolean;
  //
  url?: string;
  filePath?: string;
}

export class ClientUtil {

  static readonly log = new Logger();

  static readCheerioHtml(html: string): CheerioStatic {
    this.log.debug('readCheerio()');
    return cheerio.load(html);
  }

  static readCheerio(opts: ClientOptions): CheerioStatic {
    this.log.debug('readCheerio()');
    const html: string = fs.readFileSync(opts.filePath, 'utf8');
    return cheerio.load(html);
  }

  static async readPuppeteerPage(opts: ClientOptions, onPage: OnPage) {
    this.log.debug('readPuppeteerPage()');

    //
    let browser: Browser;
    let page: Page;

    try {

      browser = await launch();
      page = await browser.newPage();

      if (opts.url) {

        await page.goto(opts.url);

        if (opts.writeFile) {
          const html: string = await page.content();
          fs.writeFileSync(opts.filePath, html);
        }
      } else if (opts.filePath) {
        const html: string = fs.readFileSync(opts.filePath, 'utf8');
        await page.setContent(html);
      }

      await onPage(page);
    } finally {
      if (browser) {
        await browser.close();
      }
    }
  }
}
