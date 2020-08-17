import LRUCache from "lru-cache";

export default class CacheService {

  private readonly options: LRUCache.Options<string, any> = {
    //max: 0, // size, Infinity
    //maxAge: 1000 * 60 * 1, // 1min
    //maxAge: 1000 * 60 * 10, // 10min
    maxAge: 1000 * 60 * 60, // 60min
    length: (n: any, key: string) => n.length,
    dispose: async (key: string, val: any) => { },
  };
  private readonly cache = new LRUCache<string, any>(this.options);

  get(id: string): any {
    return this.cache.get(id);
  }

  set(id: string, item: any) {
    this.cache.set(id, item);
  }
}