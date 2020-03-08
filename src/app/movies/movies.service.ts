import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { environment } from "../../environments/environment";

@Injectable({ providedIn: "root" })
export class MoviesService {
  constructor(private http: HttpClient) {}

  getTheatreShowings(MoviesFormattedDate, url) {
    let params = new HttpParams()
      .set("startDate", MoviesFormattedDate)
      .set("api_key", environment.apiKey);

    return this.http.get(url, { params });
  }
}
