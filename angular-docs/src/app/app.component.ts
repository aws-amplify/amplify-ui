import { Component } from '@angular/core';
import { docRoutes } from './common/routes';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'angular-docs';
  navList = docRoutes;
}
