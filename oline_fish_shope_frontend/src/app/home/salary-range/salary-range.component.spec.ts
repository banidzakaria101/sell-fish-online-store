import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalaryRangeComponent } from './salary-range.component';

describe('SalaryRangeComponent', () => {
  let component: SalaryRangeComponent;
  let fixture: ComponentFixture<SalaryRangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SalaryRangeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SalaryRangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
