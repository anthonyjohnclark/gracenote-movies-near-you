import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { environment } from "../../environments/environment";

@Injectable({ providedIn: "root" })
export class TheatresService {
  url = "http://data.tmsapi.com/v1.1/movies/theatres";

  constructor(private http: HttpClient) {}

  getTheatres(TheatreFormattedDate, TheatreLat, TheatreLong, TheatreRadius) {
    let params = new HttpParams()
      .set("startDate", TheatreFormattedDate)
      .set("lat", TheatreLat)
      .set("lng", TheatreLong)
      .set("radius", TheatreRadius)
      .set("api_key", environment.apiKey);

    return this.http.get(this.url, { params });
  }
}
