import * as moment from 'moment';

export class Country {

    constructor(
        title: string,
        countryCode: string,
        public region: string,
        population: number,
        flagUrl: string) {}
}

export function createCountryFromSharePointResult(result: any) {
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

    return retVal;
}
