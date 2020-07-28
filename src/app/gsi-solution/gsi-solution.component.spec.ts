import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GsiSolutionComponent } from './gsi-solution.component';

describe('GsiSolutionComponent', () => {
  let component: GsiSolutionComponent;
  let fixture: ComponentFixture<GsiSolutionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GsiSolutionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GsiSolutionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
