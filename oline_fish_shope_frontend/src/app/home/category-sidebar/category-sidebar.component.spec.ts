import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategorySidebarComponent } from './category-sidebar.component';

describe('CategorySidebarComponent', () => {
  let component: CategorySidebarComponent;
  let fixture: ComponentFixture<CategorySidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CategorySidebarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategorySidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
