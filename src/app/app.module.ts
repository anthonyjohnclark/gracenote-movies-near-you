import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";

// ngx Imports
import { CollapseModule } from "ngx-bootstrap";
import { CarouselModule } from "ngx-bootstrap/carousel";
import { ModalModule } from "ngx-bootstrap";
import { BsModalRef } from "ngx-bootstrap";

//Component Imports
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { TheatresComponent } from "./theatres/theatres.component";
import { MoviesComponent } from "./movies/movies.component";
import { MoviesService } from "./movies/movies.service";
import { TheatresService } from "./theatres/theatres.service";
import { DetailsComponent } from "./details/details.component";
import { DetailsService } from "./details/details.service";
import { NavbarComponent } from "./navbar/navbar.component";
import { NavbarService } from "./navbar/navbar.service";

@NgModule({
  declarations: [
    AppComponent,
    TheatresComponent,
    MoviesComponent,
    DetailsComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    CollapseModule.forRoot(),
    CarouselModule.forRoot(),
    ModalModule.forRoot()
  ],
  providers: [
    MoviesService,
    TheatresService,
    DetailsService,
    NavbarService,
    BsModalRef
  ],
  bootstrap: [AppComponent],
  entryComponents: [DetailsComponent]
})
export class AppModule {}
