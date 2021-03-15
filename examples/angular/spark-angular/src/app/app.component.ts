import { Component } from '@angular/core';
import * as Spark from '@aws-amplify/spark-angular';
console.log(Spark);
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
      padding: '0.75rem 1.25rem 0.75rem 1.25rem',
      'border-style': 'none',
      color: 'white',
    },
  };

  onError(event) {
    console.error(event);
  }
}
