import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { PromotedLinksComponent } from './promoted-links/promoted-links.component';
import { SearchComponent } from './search/search.component';
import { APP_INITIALIZER } from '@angular/core';
import { UpcomingEventsComponent } from './upcoming-events/upcoming-events.component';
import { HttpClientModule } from '@angular/common/http';
import { TodayEventsComponent } from './today-events/today-events.component';
import { ConfigProvider, configProviderFactory } from './providers/configProvider';
import { NewsComponent } from './news/news.component';
import { NavComponent } from './nav/nav.component';
import { TableComponent } from './table/table.component';
import { CountryFactBoxComponent } from './country-fact-box/country-fact-box.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SelectCountryComponent } from './select-country/select-country.component';
import { DashboardModule } from './dashboard/dashboard.module';


import { GroupCountriesByRegionPipe } from './pipes/groupByRegions';

const appRoutes: Routes = [
  { path: 'home', component: SelectCountryComponent },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/home'
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    PageNotFoundComponent,
    SelectCountryComponent,
    GroupCountriesByRegionPipe
  ],
  imports: [
    DashboardModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    BrowserModule,
    HttpClientModule
  ],
  providers: [
    ConfigProvider,
    { provide: APP_INITIALIZER, useFactory: configProviderFactory, deps: [ConfigProvider], multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
