import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'countriesFilter',
})
export class CountriesFilterPipe implements PipeTransform {
  transform(value: any, args: any): any {
    if (!value) return null;
    if (!args) return value;

    args = args.toLowerCase();
    return value.filter((data: any) => data.name.toLowerCase().includes(args));
  }
}
