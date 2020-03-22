import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { environment } from "../../environments/environment";

@Injectable({ providedIn: "root" })
export class NavbarService {
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

  getCityNameByZipCoords(lat, long) {
    let params = new HttpParams()
      .set("key", environment.GeoApiKey)
      .set("lat", lat)
      .set("lon", long)
      .set("format", this.format);

    return this.http.get(this.url, { params });
  }

  zipUrl = "https://us1.locationiq.com/v1/search.php?";
  countrycodes = "US";

  getLatLongByZip(zipCode) {
    let params = new HttpParams()
      .set("key", environment.GeoApiKey)
      .set("postalcode", zipCode)
      .set("countrycodes", this.countrycodes)
      .set("format", this.format);

    return this.http.get(this.zipUrl, { params });
  }
}
