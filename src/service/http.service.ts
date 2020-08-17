import axios, { AxiosResponse } from 'axios';
import { Logger } from "tslog";

const log = new Logger();

// http client service
export default class HttpService {

  constructor(private endpoint: string) { }

  async get(path: string, params?: any): Promise<string> {
    //
    const url = `${this.endpoint}${path}`;
    log.debug('req.url: ', url);
    //
    const res: AxiosResponse = await axios.get(url, { params });
    //this.log.debug('res: ', res); // NOTICE too huge to log
    //
    log.debug('res.headers: ', res.headers);
    //
    const error = res.data.error;
    if (error) {
      log.debug('res.data.error: ', error);
      throw error;
    } else {
      log.debug('res.data: ', res.data);
      return res.data;
    }
  }
}
