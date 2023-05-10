import Logger from "../../lib/Logger/Logger";
import GoogleBookCredentials from "./GoogleBooksCredentials";
import axios from "axios";

export default class GoogleBooksService {
  private apiKey: string;
  API_URL = "https://books.googleapis.com/books/v1/volumes";

  constructor() {
    this.apiKey = GoogleBookCredentials.getApiKey();
  }

  private async getInGoogleApi(url: string) {
    let response = await axios.get(url);

    if (response.status !== 200) {
      Logger.error("Error in Google Books Api request", response);
      throw new Error("Error in Google Books Api request");
    }

    return response.data;
  }

  public async getBookByTerms(query: string, orderBy: string = 'relevance') {
    let url = `${this.API_URL}?filter=ebooks&libraryRestrict=no-restrict&maxAllowedMaturityRating=MATURE&printType=BOOKS&q=${query}&orderBy=${orderBy}&key=${this.apiKey}`;
    return await this.getInGoogleApi(url);
  }

  public async getBookById(id: string) {
    let url = `${this.API_URL}/${id}`;

    return await this.getBookById(url);
  }
}
