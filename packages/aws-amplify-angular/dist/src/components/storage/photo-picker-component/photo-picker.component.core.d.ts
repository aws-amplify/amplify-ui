import { EventEmitter, OnInit } from '@angular/core';
import { AmplifyService } from '../../../providers/amplify.service';
export declare class PhotoPickerComponentCore implements OnInit {
  amplifyService: AmplifyService;
  photoUrl: string;
  hasPhoto: boolean;
  uploading: boolean;
  s3ImageFile: any;
  s3ImagePath: string;
  _storageOptions: any;
  errorMessage: string;
  protected logger: any;
  constructor(amplifyService: AmplifyService);
  set url(url: string);
  set storageOptions(storageOptions: any);
  set path(path: string);
  set data(data: any);
  picked: EventEmitter<string>;
  loaded: EventEmitter<string>;
  uploaded: EventEmitter<Object>;
  ngOnInit(): void;
  pick(evt: any): void;
  uploadFile(): void;
  completeFileUpload(error?: any): void;
  onPhotoError(): void;
  onAlertClose(): void;
  _setError(err: any): void;
}
