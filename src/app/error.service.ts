import { Injectable, ErrorHandler, Injector } from "@angular/core";
import { Router } from "@angular/router";
import { AlertService } from "ngx-alerts";

@Injectable({
  providedIn: "root"
})
export class ErrorService implements ErrorHandler {
  constructor(private injector: Injector, private alertService: AlertService) {}

  handleError(error: any) {
    const router = this.injector.get(Router);
    if (error instanceof TypeError) {
      console.error("Hey this is a TypeError");
    } else {
      this.alertService.danger("An unknown error occured.");
      console.error("An unknown error occured.");
    }
    router.navigate(["error"]);
  }
  showAlerts(): void {
    // For normal messages
    this.alertService.info("this is an info alert");
    this.alertService.danger("this is a danger alert");
    this.alertService.success("this is a success alert");
    this.alertService.warning("this is a warning alert");

    // For html messages:
    this.alertService.warning({ html: "<b>This message is bold</b>" });
  }
}
