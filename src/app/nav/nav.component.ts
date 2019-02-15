import { Component, OnInit, HostListener } from '@angular/core';
import { ConfigProvider } from '../providers/configProvider';
import { CountryService } from '../services/country.service';
import { Country } from '../model/country';

import { Observable, from, of } from 'rxjs';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  navConfig: any;
  leftMenus: Array<any>;
  navbarCollapsed: boolean;
  env: string;

 // countries: Observable<Array<Country>>;
countries: Array<Country>;

obCountries: Observable<Array<Country>>;

countriesEA:  Observable<Array<Country>>;

countriesNWA: Observable<Array<Country>>;


private groupCountries(countries: Country[],region: string): Observable<Array<Country>> {

      return of(countries.filter(el => el.region == region)); 
}


 // filterCountries(region: string) {
 //   console.log('executing filterCountries with',region);
 //   return this.countries.filter(country => country.region == "EA");
 // }

  constructor(private countryService: CountryService) { }

  ngOnInit() {
    this.navConfig = ConfigProvider.settings.navMenuConfig;

    // Using the selector, find the html for the dropdown
    // TODO: Remove this and dynamically generate these (see next TODO)
    this.leftMenus = this.navConfig.leftMenus;

   /* Works!!
     this.countries = this.countryService.getCountries();
    */

    // TODO: retrieve countries from the list, possibly grouped by Region?
    // Not sure is the REST API supports grouping, especially if the Region column is a Managed Metadata column

    this.countryService.getCountries().subscribe({
     next: obsValue =>  { console.log('observable returned', obsValue); 
                          obsValue.forEach(el => console.log('Country is',el.title));
                          this.obCountries = of(obsValue);
                          console.log('packaged obCountries is', this.obCountries);

                          this.countriesEA = this.groupCountries(obsValue,'EA');
                          this.countriesNWA = this.groupCountries(obsValue,'NWA');
                          


                         // console.log('Countries in nav.components are')
                        } 
        // next(countries)   { this.countries = countries ; console.log('Countries in nav.components are',this.countries);}

         // complete() { console.log('subscribe to countries', this.countries); }
         //  console.log(countries);
       //  function(countries) { this.countries = countries; console.log(this.countries);}
      // next: {this.countries = countries; console.log(this.countries); }
     
   });

    this.adjustNavbarMenus();

    this.env = ConfigProvider.env;
  }

  // change the navbar menus to be clickable when navbar collapsed, otherwise hoverable
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.adjustNavbarMenus();
  }

  adjustNavbarMenus() {
    if ($(window).width() > 768) {
      this.navbarCollapsed = false;
      $('.dropdown').removeClass('open');
    } else {
      this.navbarCollapsed = true;
    }
  }
}
