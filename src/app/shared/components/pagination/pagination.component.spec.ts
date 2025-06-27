import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaginationComponent } from './pagination.component';
import { PaginationService } from '@shared/services';
import { By } from '@angular/platform-browser';

describe('PaginationComponent', () => {
  let fixture: ComponentFixture<PaginationComponent>;
  let component: PaginationComponent;

  const paginationServiceMock = {
    currentPage: 1,
    getVisiblePages: () => [1, 2, 3],
    setPage: jasmine.createSpy('setPage'),
    nextPage: jasmine.createSpy('nextPage').and.callFake(() => {
      paginationServiceMock.currentPage++;
    }),
    prevPage: jasmine.createSpy('prevPage').and.callFake(() => {
      paginationServiceMock.currentPage--;
    }),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginationComponent],
      providers: [
        { provide: PaginationService, useValue: paginationServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render visible page buttons', () => {
    const buttons = fixture.debugElement.queryAll(By.css('.pagination__button'));
    expect(buttons.length).toBe(3);
    expect(buttons[0].nativeElement.textContent.trim()).toBe('1');
    expect(buttons[1].nativeElement.textContent.trim()).toBe('2');
    expect(buttons[2].nativeElement.textContent.trim()).toBe('3');
  });

  it('should highlight the current page button', () => {
    paginationServiceMock.currentPage = 1;

    fixture.detectChanges();

    const activeButton = fixture.debugElement.query(By.css('.pagination__button--active'));
    expect(activeButton.nativeElement.textContent.trim()).toBe('1');
  });

  it('should disable previous button on first page', () => {
    paginationServiceMock.currentPage = 1;

    fixture.detectChanges();

    const prevButton = fixture.debugElement.query(By.css('button[aria-label="Previous page"]'));
    expect(prevButton.nativeElement.disabled).toBeTrue();
  });

  it('should emit and update when clicking nextPage', () => {
    spyOn(component.pageChange, 'emit');
    const nextButton = fixture.debugElement.query(By.css('button[aria-label="Next page"]'));
    nextButton.nativeElement.click();

    expect(paginationServiceMock.nextPage).toHaveBeenCalled();
    expect(component.pageChange.emit).toHaveBeenCalledWith(2);
  });

  it('should emit and update when clicking a page button', () => {
    spyOn(component.pageChange, 'emit');
    const pageButton = fixture.debugElement.queryAll(By.css('.pagination__button'))[1];
    pageButton.nativeElement.click();

    expect(paginationServiceMock.setPage).toHaveBeenCalledWith(2);
    expect(component.pageChange.emit).toHaveBeenCalledWith(2);
  });
});
