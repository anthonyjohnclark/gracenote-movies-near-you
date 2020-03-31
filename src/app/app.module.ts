import { BrowserModule } from "@angular/platform-browser";
import { NgModule, ErrorHandler } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { AppRoutingModule } from "./app-routing.module";

// ngx Imports
import { CollapseModule } from "ngx-bootstrap";
import { CarouselModule } from "ngx-bootstrap/carousel";
import { ModalModule } from "ngx-bootstrap";
import { BsModalRef } from "ngx-bootstrap";
import { AlertModule } from "ngx-alerts";

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
import { ErrorService } from "./error.service";
import { ErrorComponent } from "./error/error.component";

@NgModule({
  declarations: [
    AppComponent,
    TheatresComponent,
    MoviesComponent,
    DetailsComponent,
    NavbarComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    CollapseModule.forRoot(),
    CarouselModule.forRoot(),
    ModalModule.forRoot(),
    AlertModule.forRoot(),
    AppRoutingModule
  ],
  providers: [
    MoviesService,
    TheatresService,
    DetailsService,
    NavbarService,
    BsModalRef,
    {
      provide: ErrorHandler,
      useClass: ErrorService
    }
  ],
  bootstrap: [AppComponent],
  entryComponents: [DetailsComponent]
})
export class AppModule {}
