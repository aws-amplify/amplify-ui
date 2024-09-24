import { SignatureV4 } from '@smithy/signature-v4';
import {
  HttpRequest as HttpRequest,
  RequestPresigningArguments,
} from '@smithy/types';

// override aws sdk default value of 60
export const REQUEST_EXPIRY = 299;

export class Signer extends SignatureV4 {
  public presign(
    request: HttpRequest,
    options?: Omit<RequestPresigningArguments, 'expiresIn'>
  ): Promise<HttpRequest> {
    return super.presign(request, {
      ...options,
      expiresIn: REQUEST_EXPIRY,
      // `headers` that should not be signed. Liveness WebSocket
      // request omits `headers` except for required `host` header. Signature
      // could be a mismatch if other `headers` are signed
      unsignableHeaders: new Set(
        Object.keys(request.headers).filter((header) => header !== 'host')
      ),
    });
  }
}
