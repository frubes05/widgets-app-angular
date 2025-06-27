import { TestBed } from '@angular/core/testing';
import { ErrorHandlerService } from './error-handler.service';
import { MatSnackBar } from '@angular/material/snack-bar';

describe('ErrorHandlerService', () => {
  let service: ErrorHandlerService;
  let snackBarSpy: jasmine.SpyObj<MatSnackBar>;

  beforeEach(() => {
    snackBarSpy = jasmine.createSpyObj('MatSnackBar', ['open']);

    TestBed.configureTestingModule({
      providers: [
        ErrorHandlerService,
        { provide: MatSnackBar, useValue: snackBarSpy }
      ]
    });

    service = TestBed.inject(ErrorHandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should show provided error message in snackbar', () => {
    const error = { message: 'Something went wrong' };
    service.handle(error);

    expect(snackBarSpy.open).toHaveBeenCalledWith(
      'Something went wrong',
      'Close',
      { duration: 4000 }
    );
  });

  it('should show fallback message if no error message provided', () => {
    const error = {};
    service.handle(error);

    expect(snackBarSpy.open).toHaveBeenCalledWith(
      'An Error occured!',
      'Close',
      { duration: 4000 }
    );
  });
});
