import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QueryRunComponent } from './query-run.component';

describe('QueryRunComponent', () => {
  let component: QueryRunComponent;
  let fixture: ComponentFixture<QueryRunComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QueryRunComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QueryRunComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
