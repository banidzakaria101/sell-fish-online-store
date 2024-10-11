import { Component } from '@angular/core';
import { OriginCountry } from '../../enums/origin-country.enum';

@Component({
  selector: 'app-origin-country',
  templateUrl: './origin-country.component.html',
  styleUrls: ['./origin-country.component.css']
})
export class OriginCountryComponent {
  countries = Object.values(OriginCountry);
  selectedCountries: OriginCountry[] = [];

  isCountriesVisible: boolean = false;

  toggleCountries() {
    this.isCountriesVisible = !this.isCountriesVisible; // Toggle the visibility
  }
}
