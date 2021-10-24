import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeadbandComponent } from './headband/headband.component';
import { CardComponent } from './card/card.component';
import { DetailComponent } from './detail/detail.component';
import { HttpClientModule } from '@angular/common/http';
import { ListComponent } from './list/list.component';
import { DetailPageComponent } from './detail-page/detail-page.component';
import { RouteReuseStrategy } from '@angular/router';
import { CustomRouteReuseStrategy } from './route-reuse';

@NgModule({
  declarations: [
    AppComponent,
    HeadbandComponent,
    CardComponent,
    DetailComponent,
    ListComponent,
    DetailPageComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [
    {
      provide: RouteReuseStrategy,
      useClass: CustomRouteReuseStrategy,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
