import { Component, EventEmitter, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { PaginationService } from '@shared/services';

@Component({
  selector: 'awa-pagination',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent {
  private readonly pagination = inject(PaginationService);

  @Output() pageChange = new EventEmitter<number>();

  get currentPage(): number {
    return this.pagination.currentPage;
  }

  get totalPages(): number {
    return 10;
  }

  get visiblePages(): number[] {
    return this.pagination.getVisiblePages();
  }

  updatePageQuery(p: number): void {
    this.pagination.setPage(p);
    this.pageChange.emit(p);
  }

  nextPage(): void {
    this.pagination.nextPage();
    this.pageChange.emit(this.currentPage);
  }

  prevPage(): void {
    this.pagination.prevPage();
    this.pageChange.emit(this.currentPage);
  }
}