import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterTownComponent } from './register-town.component';

describe('RegisterTownComponent', () => {
  let component: RegisterTownComponent;
  let fixture: ComponentFixture<RegisterTownComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterTownComponent]
    });
    fixture = TestBed.createComponent(RegisterTownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
