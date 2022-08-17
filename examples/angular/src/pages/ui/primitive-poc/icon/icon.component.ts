import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'amplify-icon-demo',
  templateUrl: 'icon.component.html',
})
export class AmplifyIconExampleComponent {
  viewstate: { width: string; height: string } = {
    width: '20',
    height: '20',
  };
}
