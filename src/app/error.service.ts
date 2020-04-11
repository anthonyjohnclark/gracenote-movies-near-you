import { Injectable, ErrorHandler, Injector } from "@angular/core";
import { Router } from "@angular/router";
import { AlertService } from "ngx-alerts";

@Injectable({
  providedIn: "root",
})
export class ErrorService implements ErrorHandler {
  constructor(private injector: Injector, private alertService: AlertService) {}

  handleError(error: any) {
    const router = this.injector.get(Router);

    if (error.promise && error.rejection) {
      // Promise rejection wrapped by zone.js
      error = error.rejection;
    }
    if (error.message == "User denied Geolocation") {
      this.alertService.info(
        "Please enter a zip code or enable geolocation to find movies."
      );
      console.error(error);
    } else if (error.message == "Can't find any theatres.") {
      this.alertService.danger(
        "We couldn't find any theatres within this radius. Try expanding your radius or entering a new zip code."
      );
      console.error(error);
    } else if (
      error.message.match(
        "Http failure response for https://us1.locationiq.com/"
      )
    ) {
      this.alertService.danger(
        "Looks like we can't find the zip code you entered. Try enabling your location or entering another zip code."
      );
      console.error("Here be an HTTP error Response from LocationIq");
      console.error(error.message);
    } else if (error.message == "Please enter a valid radius.") {
      this.alertService.danger("Please enter a valid radius.");
      console.error(error);
    } else if (error.error.errorMessage.match("invalid_parameter_value")) {
      this.alertService.danger(
        "Looks like you entered too big of a radius. Try keeping it under 100."
      );
      console.error(error);
    } else {
      this.alertService.warning("An unknown error has occurred.");
      console.error(error);
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
