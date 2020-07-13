import { TestBed } from '@angular/core/testing';

import { TasksConfigService } from './tasks-config.service';

describe('TasksConfigService', () => {
  let service: TasksConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TasksConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
