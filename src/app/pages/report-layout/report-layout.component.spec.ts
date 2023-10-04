import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportLayoutComponent } from './report-layout.component';

describe('ReportLayoutComponent', () => {
  let component: ReportLayoutComponent;
  let fixture: ComponentFixture<ReportLayoutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReportLayoutComponent]
    });
    fixture = TestBed.createComponent(ReportLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
