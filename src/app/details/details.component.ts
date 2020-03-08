import { Component, AfterContentInit, Input } from "@angular/core";
import { Injectable } from "@angular/core";
import { BsModalService, BsModalRef } from "ngx-bootstrap";
import { DetailsService } from "./details.service";

class MovieDetails {
  constructor(
    public title: string,
    public releaseYear: any,
    public releaseDate: string,
    public titleLang: string,
    public genres: string,
    public Description: string,
    public Cast: string,
    public Directors: string
  ) {}
}

@Component({
  selector: "movie-details",
  templateUrl: "./details.component.html",
  styleUrls: ["./details.component.css"]
})
@Injectable({ providedIn: "root" })
export class DetailsComponent implements AfterContentInit {
  @Input() MovieID: string;
  modalRef: BsModalRef;
  detailsURL;
  imageURL;
  MovieArray = [];
  MovieImages;
  BannerImage;
  MovieData;

  constructor(
    public bsModalRef: BsModalRef,
    private bsModalService: BsModalService,
    private _DetailsService: DetailsService
  ) {}

  ngAfterContentInit() {
    console.log(this.MovieID);
    this.assignMovieURL();
    this.getMovieDetails();
    this.assignMovieImageURL();
    this.getMovieImage();
  }

  assignMovieURL() {
    return new Promise((resolve, reject) => {
      var url = "http://data.tmsapi.com/v1.1/programs/" + this.MovieID;
      this.detailsURL = url;
      resolve(this.detailsURL);
      console.log(this.detailsURL),
        err => {
          reject(err);
        };
    });
  }

  assignMovieImageURL() {
    return new Promise((resolve, reject) => {
      var url =
        "http://data.tmsapi.com/v1.1/programs/" + this.MovieID + "/images";
      this.imageURL = url;
      resolve(this.imageURL);
      console.log(this.imageURL),
        err => {
          reject(err);
        };
    });
  }

  async getMovieImage() {
    await this.assignMovieImageURL();
    return new Promise((resolve, reject) => {
      this._DetailsService
        .getBannerImage(this.imageURL)
        .toPromise()
        .then(
          (res: any) => {
            this.MovieImages = res;
            resolve(this.MovieImages);
            this.BannerImage = this.MovieImages.find(
              ({ width }) => width === "1280"
            );
            console.log(this.MovieImages);
            console.log(this.BannerImage.uri);
          },
          err => {
            reject(err);
          }
        );
    });
  }

  async getMovieDetails() {
    await this.assignMovieURL();
    return new Promise((resolve, reject) => {
      this._DetailsService
        .getDetails(this.detailsURL)
        .toPromise()
        .then(
          (res: any) => {
            this.MovieArray.push(res);
            this.MovieData = this.MovieArray.map(data => {
              return new MovieDetails(
                data.title,
                data.releaseYear,
                data.releaseDate,
                data.titleLang,
                data.genres,
                data.longDescription,
                data.cast,
                data.directors
              );
            });
            resolve(this.MovieData);
            console.log(this.MovieData[0].Cast);
            console.log(this.MovieArray);
          },
          err => {
            reject(err);
          }
        );
    });
  }

  hideModal() {
    this.bsModalService.hide(1);
    document.body.classList.remove("modal-open");
    const modalContainer = document.querySelector("modal-container");
    if (modalContainer !== null) {
      modalContainer.parentNode.removeChild(modalContainer);
    }
  }
}
