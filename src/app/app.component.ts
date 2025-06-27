import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavigationComponent } from "@shared/components/navigation/navigation.component";

@Component({
  selector: 'awa-root',
  imports: [RouterOutlet, NavigationComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'angular-widgets-app';
}