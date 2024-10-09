import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OriginCountryComponent } from './origin-country.component';

describe('OriginCountryComponent', () => {
  let component: OriginCountryComponent;
  let fixture: ComponentFixture<OriginCountryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OriginCountryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OriginCountryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
