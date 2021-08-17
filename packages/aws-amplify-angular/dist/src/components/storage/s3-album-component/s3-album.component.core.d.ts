import { EventEmitter, OnInit } from '@angular/core';
import { AmplifyService } from '../../../providers/amplify.service';
export declare class S3AlbumComponentCore implements OnInit {
  amplifyService: AmplifyService;
  list: Array<Object>;
  _path: string;
  _options: any;
  protected logger: any;
  selected: EventEmitter<string>;
  constructor(amplifyService: AmplifyService);
  ngOnInit(): void;
  onImageSelected(event: any): void;
  set data(data: any);
  set path(path: string);
  set options(options: any);
  getList(path: any, options: any): void;
}
