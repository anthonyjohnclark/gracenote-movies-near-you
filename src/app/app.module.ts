import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";

// ngx Imports
import { CollapseModule } from "ngx-bootstrap";
import { CarouselModule } from "ngx-bootstrap/carousel";
import { ModalModule } from "ngx-bootstrap";
import { BsModalRef } from "ngx-bootstrap";

//Component Imports
import { LocationComponent } from "./location/location.component";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { TheatresComponent } from "./theatres/theatres.component";
import { MoviesComponent } from "./movies/movies.component";
import { LocationService } from "./location/location.service";
import { MoviesService } from "./movies/movies.service";
import { TheatresService } from "./theatres/theatres.service";
import { DetailsComponent } from "./details/details.component";
import { DetailsService } from "./details/details.service";

@NgModule({
  declarations: [
    AppComponent,
    LocationComponent,
    TheatresComponent,
    MoviesComponent,
    DetailsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CollapseModule.forRoot(),
    CarouselModule.forRoot(),
    ModalModule.forRoot()
  ],
  providers: [
    LocationService,
    MoviesService,
    TheatresService,
    DetailsService,
    BsModalRef
  ],
  bootstrap: [AppComponent],
  entryComponents: [DetailsComponent]
})
export class AppModule {}
