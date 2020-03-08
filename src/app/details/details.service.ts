import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { environment } from "../../environments/environment";

@Injectable({ providedIn: "root" })
export class DetailsService {
  constructor(private http: HttpClient) {}

  getDetails(url) {
    let params = new HttpParams().set("api_key", environment.apiKey);
    return this.http.get(url, { params });
  }

  getBannerImage(url) {
    let params = new HttpParams().set("api_key", environment.apiKey);
    return this.http.get(url, { params });
  }
}
