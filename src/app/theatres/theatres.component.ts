import { Component, Input, OnChanges, SimpleChanges } from "@angular/core";
import { TheatresService } from "./theatres.service";

class Theatres {
  constructor(
    public theatreId: number,
    public name: string,
    public location: number
  ) {}
}

@Component({
  selector: "app-theatres",
  templateUrl: "./theatres.component.html",
  providers: [TheatresService]
})
export class TheatresComponent implements OnChanges {
  constructor(private _TheatresService: TheatresService) {}

  TheatreData;

  @Input() TheatreFormattedDate: string;
  @Input() TheatreLat: number;
  @Input() TheatreLong: number;
  @Input() TheatreRadius: string;

  ngOnChanges(changes: SimpleChanges) {
    if ((changes["TheatreLat"], ["TheatreLong"], ["TheatreRadius"])) {
      this.getTheatreData();
    }
  }

  getTheatreData() {
    return new Promise((resolve, reject) => {
      this._TheatresService
        .getTheatres(
          this.TheatreFormattedDate,
          this.TheatreLat,
          this.TheatreLong,
          this.TheatreRadius
        )
        .toPromise()
        .then(
          (res: any) => {
            this.TheatreData = res.map(data => {
              return new Theatres(
                data.theatreId,
                data.name,
                data.location.distance
              );
            });
            resolve(this.TheatreData);
            console.log(this.TheatreData);
          },
          err => {
            reject(err);
          }
        );
    });
  }
}
