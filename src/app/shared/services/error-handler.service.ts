import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({ providedIn: 'root' })
export class ErrorHandlerService {
  private readonly snackBarService = inject(MatSnackBar);

  handle(error: any): void {
    const message = error?.message ?? 'An Error occured!';
    this.snackBarService.open(message, 'Close', { duration: 4000 });
  }
}