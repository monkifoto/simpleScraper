import { Injectable, Logger } from '@nestjs/common';
import * as puppeteer from 'puppeteer';
import * as sleep from 'sleep';

@Injectable()
export class ScraperService {
  logger: Logger = new Logger('ScraperService');

  async scrape() {
    //   Get a page
    this.logger.log('Scraping...');
    const browser = await puppeteer.launch({ headless: false });
    const page: puppeteer.Page = await browser.newPage();
    await page.goto('http://www.rentometer.com', { waitUntil: 'load' });
    this.logger.log(page.url());

    // Fill out form, sleep (to bypass automation check) and submit
    await page.type(
      '#address_unified_search_address',
      '7810 Contee Rd, Laurel, MD, 20707, USA',
    );
    await page.type('#address_unified_search_bed_style', '2');
    await sleep.sleep(2);
    await page.click('input[name="commit"]');

    // Check the url
    await page.waitForNavigation();
    this.logger.log('New Page URL:', page.url());

    // Get the stats box
    const statsBoxes = await page.$eval(
      'div.stats-summary-well div.row',
      el => {
        return el.children;
      },
    );
    this.logger.log(statsBoxes);
    // if (statsBoxes.length) {
    //     statsBoxes.forEach((div) => {
    //         div.text();
    //     });
    // }

    await page.close();
    await browser.close();
  }
}
