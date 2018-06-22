import { TestBed, inject } from '@angular/core/testing';

import { ProjectsServiceService } from './projects-service.service';

describe('ProjectsServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProjectsServiceService]
    });
  });

  it('should be created', inject([ProjectsServiceService], (service: ProjectsServiceService) => {
    expect(service).toBeTruthy();
  }));
});
