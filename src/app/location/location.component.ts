import {
  Component,
  SimpleChanges,
  Input,
  OnChanges,
  OnInit
} from "@angular/core";
import { LocationService } from "./location.service";

@Component({
  selector: "app-location",
  templateUrl: "./location.component.html",
  providers: [LocationService]
})
export class LocationComponent implements OnChanges, OnInit {
  lat: 0;
  long: 0;
  @Input() radius: number;
  @Input() zipCode: number;
  FormattedDate: string;
  cityName;

  constructor(private _LocationService: LocationService) {}

  ngOnInit() {
    this.getDate();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes["radius"]) this.getLocation();
    this.getCityName();
  }

  getLocation() {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        function resolveLocation(position) {
          var coordinates = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          };
          resolve(coordinates);
        },
        function resolveError(error) {
          var errorMessage = error;
          reject("Geolocation error: " + errorMessage);
        }
      );
    });
  }

  async getCityName() {
    const coordinates = await this.getLocation();
    console.log(coordinates);
    var cityName;
    var lat = coordinates["latitude"];
    var long = coordinates["longitude"];
    this.long = long;
    console.log("User longitude is:", long);
    this.lat = lat;
    console.log("User latitude is:", lat);
    this._LocationService
      .getCityNameByCoords(lat, long)
      .subscribe(data => (this.cityName = data));
    this.cityName = cityName;
  }

  getDate() {
    var CurrentDate = new Date();
    console.log(CurrentDate);
    var FormattedDate = CurrentDate.toISOString().split("T")[0];
    console.log(FormattedDate);
    this.FormattedDate = FormattedDate;
  }
}
