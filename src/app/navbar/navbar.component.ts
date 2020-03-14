import { Component, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"]
})
export class NavbarComponent implements OnInit {
  constructor() {}

  radius = 20;

  ngOnInit() {}

  getRadius(value: number): void {
    this.radius = value;
    console.log("Default radius is", this.radius);
  }
}
export class CollapseNavBarAnimatedComponent {
  isCollapsed = false;
}
