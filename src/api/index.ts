import { Logger } from "tslog";
import { appService } from '../index';
import { Options } from '../data';

const log = new Logger();

// TODO 2nd level failover
const root: any = {
  hello: () => {
    log.debug('hello()');
    return 'Hello world!';
  },
  sayHello: (args: any) => {
    return `Hello ${args.name}!`;
  },
  posts: async (args: any) => {
    log.debug('posts()');

    // resolve args

    log.debug('args.filter: ', args.filter);
    log.debug('args.orderBy: ', args.orderBy);
    let options: Options = {};
    if (args.page) {
      options.page = args.page;
    }
    if (args.filter) {
      options.filter = args.filter.comments;
    }
    if (args.orderBy) {
      options.sort = args.orderBy.comments;
    }
    log.debug('options: ', options);

    //

    return appService.getPosts(options);
  },
};

export { root };