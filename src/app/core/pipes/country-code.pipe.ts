import { Pipe, PipeTransform } from '@angular/core';

const COUNTRY_CODES: Record<string, string> = {
  bulgaria: 'BG',
  germany: 'DE',
  france: 'FR',
  italy: 'IT',
};

@Pipe({
  name: 'countryCode',
  standalone: true,
})
export class CountryCodePipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return '';
    const code = COUNTRY_CODES[value.trim().toLowerCase()];
    return code ? code : value;
  }
}
