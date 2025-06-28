import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginationSkeletonsComponent } from './pagination-skeletons.component';

describe('PaginationSkeletonsComponent', () => {
  let component: PaginationSkeletonsComponent;
  let fixture: ComponentFixture<PaginationSkeletonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginationSkeletonsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaginationSkeletonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
