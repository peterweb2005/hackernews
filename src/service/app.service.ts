import { Logger } from "tslog";
import { ClientUtil } from '../client/util';
import { Options } from '../data/index';
import { Post } from '../data/post';
import CacheService from "./cache.service";
import { DataService } from "./data.service";
import HttpService from "./http.service";

const log = new Logger();

// TODO 1st level failover
export class AppService {

  constructor(
    private cacheService: CacheService,
    private dataService: DataService,
    private httpService: HttpService,
  ) { }

  async getPosts(opt: Options): Promise<Post[]> {
    log.debug('getPosts()');

    let cacheKey = '';
    if (opt.page) {
      if (opt.page > 1) {
        cacheKey += `_p${opt.page}`;
      }
    }
    let cacheItems: Post[];

    // from cache
    cacheItems = this.cacheService.get(cacheKey);
    if (!cacheItems) {

      // read doc from http
      let params: any;
      if (opt.page) {
        params = { p: opt.page };
      }
      const data: string = await this.httpService.get('/news', params);

      // parse html from doc
      const $: CheerioStatic = ClientUtil.readCheerioHtml(data);

      // parse data from html
      cacheItems = this.dataService.extractPost($, opt);

      // to cache
      this.cacheService.set(cacheKey, cacheItems);
    }

    // filter, sort
    cacheItems = this.dataService.applyFilterSort(cacheItems, opt);

    return cacheItems;
  }
}