import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidNavComponent } from './sid-nav.component';

describe('SidNavComponent', () => {
  let component: SidNavComponent;
  let fixture: ComponentFixture<SidNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SidNavComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SidNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
