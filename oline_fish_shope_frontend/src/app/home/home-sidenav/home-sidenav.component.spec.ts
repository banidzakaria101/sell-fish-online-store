import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeSidenavComponent } from './home-sidenav.component';

describe('HomeSidenavComponent', () => {
  let component: HomeSidenavComponent;
  let fixture: ComponentFixture<HomeSidenavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeSidenavComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomeSidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
