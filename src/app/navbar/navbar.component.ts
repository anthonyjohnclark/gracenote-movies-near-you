import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"]
})
export class NavbarComponent implements OnInit {
  constructor() {}

  radius = 20;
  zipCode = null;

  ngOnInit() {
    console.log("Default radius is", this.radius);
    console.log("ZipCode entered is", this.zipCode);
  }

  getRadius(value: number): void {
    this.radius = value;
    console.log("Default radius is", this.radius);
  }

  getZip(value: number): void {
    this.zipCode = value;
    console.log("ZipCode entered is", this.zipCode);
  }
}
export class CollapseNavBarAnimatedComponent {
  isCollapsed = false;
}
