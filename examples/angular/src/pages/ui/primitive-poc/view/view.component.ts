import { Component, Input, OnInit } from '@angular/core';
import { Amplify, I18n } from 'aws-amplify';
import { translations } from '@aws-amplify/ui-angular';

import awsExports from './aws-exports';

@Component({
  selector: 'amplify-view-demo',
  templateUrl: 'view.component.html',
})
export class AmplifyViewExampleComponent implements OnInit {
  @Input() buttonName = 'Amplify Button POC ';
  @Input() flag = true;
  constructor() {}

  ngOnInit() {}

  clickbutton(value: string) {
    let display = '🏔 What a beautiful <' + value + '>! 🔭';
    alert(display);
  }
}
