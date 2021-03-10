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
    Authenticator: {
      Container: {
        width: '22rem',
        padding: '3rem',
        'box-shadow': '1px 1px 4px 0 rgba(0, 0, 0, 0.15)',
      },
      Input: {
        display: 'block',
        padding: '0.875rem',
        width: '90%',
        'margin-bottom': '1.25rem',
        'border-color': 'rgb(196, 196, 196)',
        'border-width': '1px',
      },
      Label: {
        display: 'block',
        'margin-bottom': '0.625rem',
      },
      Button: {
        'background-color': 'skyblue',
        padding: '0.75rem 1.25rem 0.75rem 1.25rem',
        'border-style': 'none',
        color: 'white',
      },
    },
  };
}
