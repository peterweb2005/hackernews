export class Post {
  constructor(
    //
    public id: string,
    //
    public user: string,
    //
    public title: string,
    public score: number, // points
    public age: string,
    public comments: number,
    //
    public rank: number, // useful?
  ) { }
}