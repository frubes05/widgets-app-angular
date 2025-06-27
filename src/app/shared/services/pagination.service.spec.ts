import { TestBed } from '@angular/core/testing';
import { PaginationService } from './pagination.service';
import { skip, take } from 'rxjs/operators';

describe('PaginationService', () => {
  let service: PaginationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PaginationService],
    });
    service = TestBed.inject(PaginationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize with page 1', () => {
    expect(service.currentPage).toBe(1);
  });

  it('should set the page within bounds', () => {
    service.setPage(5);
    expect(service.currentPage).toBe(5);
  });

  it('should clamp page below 1 to 1', () => {
    service.setPage(-3);
    expect(service.currentPage).toBe(1);
  });

  it('should clamp page above totalPages to totalPages', () => {
    service.setPage(999);
    expect(service.currentPage).toBe(10);
  });

  it('should increment page with nextPage()', () => {
    service.setPage(3);
    service.nextPage();
    expect(service.currentPage).toBe(4);
  });

  it('should not increment beyond totalPages', () => {
    service.setPage(10);
    service.nextPage();
    expect(service.currentPage).toBe(10);
  });

  it('should decrement page with prevPage()', () => {
    service.setPage(3);
    service.prevPage();
    expect(service.currentPage).toBe(2);
  });

  it('should not decrement below 1', () => {
    service.setPage(1);
    service.prevPage();
    expect(service.currentPage).toBe(1);
  });

  it('should reset to page 1', () => {
    service.setPage(7);
    service.reset();
    expect(service.currentPage).toBe(1);
  });

  it('should return correct visible pages near middle', () => {
    service.setPage(5);
    expect(service.getVisiblePages()).toEqual([4, 5, 6]);
  });

  it('should return correct visible pages near start', () => {
    service.setPage(1);
    expect(service.getVisiblePages()).toEqual([1, 2, 3]);
  });

  it('should return correct visible pages near end', () => {
    service.setPage(10);
    expect(service.getVisiblePages()).toEqual([8, 9, 10]);
  });

  it('should emit new page value via page$', (done) => {
    service.page$.pipe(skip(1), take(1)).subscribe((page) => {
      expect(page).toBe(2);
      done();
    });

    service.setPage(2);
  });
});
