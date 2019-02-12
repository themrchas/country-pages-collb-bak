import { Injectable } from '@angular/core';
import { SpListService } from './sp-list.service';
import { ConfigProvider } from '../providers/configProvider';
import { Country, createCountryArrayFromSharePointResponse } from '../model/country';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  constructor(private spListService: SpListService) { }

  getCountry(countryCode): Observable<Country> {
    const filter = `Country_x0020_Code eq '${countryCode.toUpperCase()}'`;
    return this.spListService.getListItems(ConfigProvider.settings.country.webURL,
      ConfigProvider.settings.country.listName, null, filter, 1).pipe(map(resp => {
        console.log('getCountry response is',resp);
        const respArray = createCountryArrayFromSharePointResponse(resp);
        console.log('response in array format is',respArray);
        return respArray.length > 0 ? respArray[0] : null;
      }));
  }

  getCountries(): Observable<Array<Country>> {
    return this.spListService.getListItems(ConfigProvider.settings.country.webURL,
      ConfigProvider.settings.country.listName).pipe(map(resp => {
        return createCountryArrayFromSharePointResponse(resp);
    }));
  }
}
