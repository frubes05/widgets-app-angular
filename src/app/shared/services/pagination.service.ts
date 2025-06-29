import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PaginationService {
  private readonly totalPages = 10;
  private readonly pageSubject = new BehaviorSubject<number>(1);
  readonly page$: Observable<number> = this.pageSubject.asObservable();

  get currentPage(): number {
    return this.pageSubject.value;
  }

  setPage(page: number): void {
    const safePage = Math.max(1, Math.min(this.totalPages, page));
    if (safePage !== this.pageSubject.value) {
      this.pageSubject.next(safePage);
    }
  }

  nextPage(): void {
    this.setPage(this.currentPage + 1);
  }

  prevPage(): void {
    this.setPage(this.currentPage - 1);
  }

  reset(): void {
    this.setPage(1);
  }

  getVisiblePages(): number[] {
    const current = this.currentPage;

    let start = Math.max(1, current - 1);
    let end = Math.min(this.totalPages, start + 2);

    if (end - start < 2) {
      start = Math.max(1, end - 2);
    }

    const pages: number[] = [];
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  }
}
