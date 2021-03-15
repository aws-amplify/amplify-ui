import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'spark-angular';
  customStyle = {
    Button: {
      'background-color': 'skyblue',
    },
  };

  onError($event: object): void {
    console.error($event);
  }
}
