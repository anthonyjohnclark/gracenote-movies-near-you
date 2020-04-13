import { Component, OnInit } from "@angular/core";
import { NavbarService } from "./navbar.service";

class NoRadius extends Error {
  constructor(message) {
    super(message);
    this.name = "NoRadius";
    this.message = message;
  }
}

class InvalidRadius extends Error {
  constructor(message) {
    super(message);
    this.name = "InvalidRadius";
    this.message = message;
  }
}

class NoGeo extends Error {
  constructor(message) {
    super(message);
    this.name = "NoGeo";
    this.message = message;
  }
}

class InvalidZip extends Error {
  constructor(message) {
    super(message);
    this.name = "InvalidZip";
    this.message = message;
  }
}

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"],
})
export class NavbarComponent implements OnInit {
  constructor(private _NavBarService: NavbarService) {}

  radius = 20;
  zipCode: number;
  FormattedDate: string;
  lat = null;
  long = null;
  cityName;
  isCollapsed = false;

  ngOnInit() {
    this.getDate();
    this.getLocation();
    this.getCityName();
    console.log("The default longitude is", this.long);
    console.log("The default latitude is", this.lat);
    console.log("Default radius is", this.radius);
    console.log("ZipCode entered is", this.zipCode);
  }

  getLocation() {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          function resolveLocation(position) {
            var coordinates = {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            };
            resolve(coordinates);
          },
          (error) => {
            reject(error);
          }
        );
      }
    }).catch();
  }

  async getCityName() {
    try {
      await this.getLocation();
    } catch (error) {
      throw new NoGeo("Geolocation has not been enabled.");
    }
    const coordinates = await this.getLocation();
    var cityName;
    var lat = coordinates["latitude"];
    var long = coordinates["longitude"];
    this.long = long;
    console.log("User longitude is:", long);
    this.lat = lat;
    console.log("User latitude is:", lat);
    this._NavBarService
      .getCityNameByCoords(lat, long)
      .subscribe((data) => (this.cityName = data));
    this.cityName = cityName;
  }

  getRadius(value: any): void {
    if (value == "") {
      throw new NoRadius("Please enter a valid radius.");
    } else if (value > 100) {
      throw new InvalidRadius("Radius greater than 100.");
    } else {
      this.radius = value;
    }
  }

  getZip(value: any): void {
    this.zipCode = value;
    console.log("ZipCode entered is", this.zipCode);
    if (value === "") {
      this.getLocation();
      this.getCityName();
    } else {
      this.getCoordsByZipCode();
      this.getCityNameWithZip();
    }
  }

  getDate() {
    var CurrentDate = new Date();
    console.log(CurrentDate);
    var FormattedDate = CurrentDate.toISOString().split("T")[0];
    console.log(FormattedDate);
    this.FormattedDate = FormattedDate;
  }

  getCoordsByZipCode() {
    return new Promise((resolve, reject) => {
      var CoordsByZipCode;
      this._NavBarService
        .getLatLongByZip(this.zipCode)
        .toPromise()
        .then(
          (res: any) => {
            CoordsByZipCode = res;
            resolve(CoordsByZipCode);
            console.log(CoordsByZipCode);
          },
          (err) => {
            reject(err);
          }
        );
    }).catch();
  }

  async getCityNameWithZip() {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      await this.getCoordsByZipCode();
    } catch (error) {
      throw new InvalidZip("ZipCode entered is invalid.");
    }
    const CoordsByZipCode = await this.getCoordsByZipCode();
    console.log(CoordsByZipCode);
    var cityName;
    var lat = CoordsByZipCode[0].lat;
    var long = CoordsByZipCode[0].lon;
    this.lat = lat;
    console.log("New zip lat is:", this.lat);
    this.long = long;
    console.log("New zip long is:", this.long);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    this._NavBarService
      .getCityNameByZipCoords(this.lat, this.long)
      .subscribe((data) => (this.cityName = data));
    this.cityName = cityName;
  }

  Collapse() {
    this.isCollapsed = !this.isCollapsed;
  }
}

export class CollapseNavBarAnimatedComponent {}
