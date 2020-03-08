import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { environment } from "../../environments/environment";

@Injectable({ providedIn: "root" })
export class LocationService {
  url = "https://us1.locationiq.com/v1/reverse.php?";
  format = "json";
  constructor(private http: HttpClient) {}

  getCityNameByCoords(lat, long) {
    let params = new HttpParams()
      .set("key", environment.GeoApiKey)
      .set("lat", lat)
      .set("lon", long)
      .set("format", this.format);

    return this.http.get(this.url, { params });
  }
}
