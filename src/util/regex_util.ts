export class RegexUtil {
  // IMPORTANT no number format, eg: 1,000
  static extractNumber(val: string): number {
    return Number(val.match(/\d+/g));
  }
}