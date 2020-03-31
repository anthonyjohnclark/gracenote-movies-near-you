import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  TemplateRef
} from "@angular/core";
import { MoviesService } from "./movies.service";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { DetailsComponent } from "../details/details.component";

class Movies {
  constructor(
    public preferredImage: string,
    public title: string,
    public MovieID: string,
    public showtimes: string = new Date().toDateString(),
    public ratings: string
  ) {}
}

@Component({
  selector: "app-movies",
  templateUrl: "./movies.component.html",
  styleUrls: ["./movies.component.css"]
})
export class MoviesComponent implements OnChanges {
  modalRef: BsModalRef;
  static MovieTheatreID: string;
  constructor(
    private _MoviesService: MoviesService,
    private modalService: BsModalService
  ) {}

  @Input() MovieTheatreId;
  @Input() MoviesFormattedDate;
  MovieShowings;
  url;
  MovieID;

  ngOnChanges(changes: SimpleChanges) {
    if (changes["MovieTheatreId"]) {
      console.log(this.MovieTheatreId);
      this.assignURL();
      this.getShowingsData();
    }
  }

  assignURL() {
    return new Promise((resolve, reject) => {
      var url =
        "http://data.tmsapi.com/v1.1/movies/theatres/" +
        this.MovieTheatreId +
        "/showings";
      this.url = url;
      resolve(this.url);
      console.log(this.url),
        err => {
          reject(err);
        };
    });
  }

  async getShowingsData() {
    await this.assignURL();
    return new Promise((resolve, reject) => {
      this._MoviesService
        .getTheatreShowings(this.MoviesFormattedDate, this.url)
        .toPromise()
        .then(
          (res: any) => {
            this.MovieShowings = res.map(data => {
              return new Movies(
                data.preferredImage,
                data.title,
                data.tmsId,
                data.showtimes,
                data.ratings
              );
            });
            resolve(this.MovieShowings);
            console.log(this.MovieShowings);
          },
          err => {
            reject(err);
          }
        );
    });
  }

  itemsPerSlide = 5;
  singleSlideOffset = true;
  noWrap = false;

  openModal(template: TemplateRef<DetailsComponent>) {
    this.modalRef = this.modalService.show(template, {
      animated: true
    });
  }
}
