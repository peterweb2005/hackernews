import { Logger } from "tslog";
import { Post } from '../data/post';
import { RegexUtil } from '../util/regex_util';
import { Options, Sort, FilterType } from '../data/index';

const log = new Logger();

export class DataService {

  // TODO throw exception
  // ENHANCE filter move to map
  extractPost($: CheerioStatic, opt: Options): Post[] {
    log.debug('extractPost()');

    // post elements

    const itemlist: Cheerio = $('table.itemlist');
    //log.debug('itemlist: ', itemlist);
    const athing: Cheerio = itemlist.find('tr.athing');
    log.debug('athing.length: ', athing.length);

    // map elements to data

    let items: Post[] = athing.map((_, e: CheerioElement) => {

      // 1st row

      let $e: Cheerio = $(e);

      const id: string = $e.attr('id');
      log.debug('id: ', id);

      const rank: number = this.extractNumber($e, 'span.rank');
      log.debug('rank: ', rank);

      // 2nd .title
      const titleE: any = $e.find('td.title').get(1);
      const title: string = $(titleE).text();
      log.debug('title: ', title);

      // 2nd row

      $e = $e.next();

      const score: number = this.extractNumber($e, '.score');
      log.debug('score: ', score);

      const user: string = $e.find('.hnuser').text();
      log.debug('user: ', user);

      const age: string = $e.find('.age').text();
      log.debug('age: ', age);

      const comments: number = this.extractNumber($e, 'a:contains("comments")');
      log.debug('comments: ', comments);

      const item: Post = { id, user, title, score, age, comments, rank };

      return item;
    }).get();

    return items;
  }

  applyFilterSort(items: Post[], opt: Options): Post[] {

    // filter
    if (opt && opt.filter) {
      const type: FilterType = opt.filter.type;
      const amount: number = Number(opt.filter.amount);
      items = items.filter((i: Post): boolean => {
        switch (type) {
          case FilterType.eq:
            return i.comments == amount;
          case FilterType.ge:
            return i.comments >= amount;
          case FilterType.gt:
            return i.comments > amount;
          case FilterType.le:
            return i.comments <= amount;
          case FilterType.lt:
            return i.comments < amount;
          default:
            return true;
        }
      });
    }

    // sort
    if (opt && opt.sort) {
      items = items.sort((i: Post, i1: Post): number => {
        switch (opt.sort) {
          case Sort.desc:
            return i1.comments - i.comments;
          default:
            return i.comments - i1.comments;
        }
      });
    }

    return items;
  }

  private extractNumber($e: Cheerio, selector: string): number {
    const text = $e.find(selector).text();
    return RegexUtil.extractNumber(text);
  }
}