import { Pipe,PipeTransform } from '@angular/core';
import { Country } from '../model/country';

@Pipe({name: 'groupCountriesByRegion'})
export class GroupCountriesByRegionPipe implements PipeTransform {
    transform(countries :Country[], region:String) {
console.log('region in pipe is',region,'and countries are',countries);
       return countries.filter(country => country.region == region)
        
    }
}