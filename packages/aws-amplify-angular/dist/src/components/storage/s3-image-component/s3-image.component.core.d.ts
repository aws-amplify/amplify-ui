import { EventEmitter, OnInit } from '@angular/core';
import { AmplifyService } from '../../../providers/amplify.service';
export declare class S3ImageComponentCore implements OnInit {
  amplifyService: AmplifyService;
  url: any;
  _path: string;
  _options: any;
  protected logger: any;
  selected: EventEmitter<string>;
  constructor(amplifyService: AmplifyService);
  set data(data: any);
  set path(path: string);
  set options(options: any);
  ngOnInit(): void;
  onImageClicked(): void;
  getImage(path: any, options: any): void;
}
