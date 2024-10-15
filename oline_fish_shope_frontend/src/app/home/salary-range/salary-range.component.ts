import { Component } from '@angular/core';

@Component({
  selector: 'app-salary-range',
  templateUrl: './salary-range.component.html',
  styleUrls: ['./salary-range.component.css']
})
export class SalaryRangeComponent {
  salaryRange: number[] = [20, 600];
  isExpanded: boolean = true;
}
