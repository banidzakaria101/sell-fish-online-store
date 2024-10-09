import { Component } from '@angular/core';

@Component({
  selector: 'app-salary-range',
  templateUrl: './salary-range.component.html',
  styleUrls: ['./salary-range.component.css']
})
export class SalaryRangeComponent {
  rangeValues: number[] = [10, 900];
}
