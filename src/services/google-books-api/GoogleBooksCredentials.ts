export default class GoogleBookCredentials {
  public static googleBooksApiKey: string;

  public static getApiKey(): string {
    if (!this.googleBooksApiKey) {
      this.googleBooksApiKey = process.env.GOOGLE_BOOKS_API_KEY as string;
    }

    return this.googleBooksApiKey;
  }
}
