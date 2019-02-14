import * as moment from 'moment';

export class Country {

    constructor(
        public title: string,
        public countryCode: string,
        public region: string,
        public population: number,
        public flagUrl: string) {}
}

export function createCountryFromSharePointResult(result: any) {
    console.log('createCountryFromSharePointResult mapping:',result);
    return new Country(
        result.Title,
        result.Country_x0020_Code,
        result.Region,
        result.Population,
        result.FlagImage ? result.FlagImage.Url : null);
}

export function createCountryArrayFromSharePointResponse(resp) {
    let retVal: Array<Country>;
    if (resp && resp['d'] && resp['d'].results) {
        retVal = resp['d'].results.map(createCountryFromSharePointResult);
    } else {
        console.error('Unable to retrieve countries from SP response');
        retVal = new Array<Country>();
    }
    console.log('country.ts created country array is', retVal);
    return retVal;
}
