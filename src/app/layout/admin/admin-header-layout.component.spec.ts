import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminHeaderLayoutComponent } from './admin-header-layout.component';

describe('AdminHeaderLayoutComponent', () => {
  let component: AdminHeaderLayoutComponent;
  let fixture: ComponentFixture<AdminHeaderLayoutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminHeaderLayoutComponent]
    });
    fixture = TestBed.createComponent(AdminHeaderLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
