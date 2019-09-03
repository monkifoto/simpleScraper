import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ScraperService } from './scraper.service';

@Controller()
export class AppController {
  constructor(private readonly scraperService: ScraperService) {}

  @Get('/scrape')
  async scrape() {
    return await this.scraperService.scrape();
    // return this.appService.getHello();
  }
}
