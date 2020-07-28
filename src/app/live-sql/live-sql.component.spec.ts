import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveSqlComponent } from './live-sql.component';

describe('LiveSqlComponent', () => {
  let component: LiveSqlComponent;
  let fixture: ComponentFixture<LiveSqlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LiveSqlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LiveSqlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
