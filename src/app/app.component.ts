import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  title = "movies-near-you";

  constructor() {}
}
export class CollapseNavBarAnimatedComponent {
  isCollapsed = false;
}
