import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({ providedIn: 'root' })
export class ErrorHandlerService {
  constructor(private readonly snackBar: MatSnackBar) {}

  handle(error: any): void {
    const message = error?.message ?? 'An Error occured!';
    this.snackBar.open(message, 'Close', { duration: 4000 });
  }
}