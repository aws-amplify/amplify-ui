import { Sha256 } from '@aws-crypto/sha256-js';
import { SignatureV4 } from '@smithy/signature-v4';
import {
  HttpRequest as HttpRequest,
  RequestPresigningArguments,
} from '@smithy/types';

type SignatureV4Params = ConstructorParameters<typeof SignatureV4>[0];

interface SignerParams extends Omit<SignatureV4Params, 'service' | 'sha256'> {}

const DEFAULT_PARAMS: Pick<SignatureV4Params, 'sha256' | 'service'> = {
  sha256: Sha256,
  service: 'rekognition',
};

// override aws sdk default value of 60
export const REQUEST_EXPIRY = 299;

export class Signer extends SignatureV4 {
  constructor(params: SignerParams) {
    super({ ...params, ...DEFAULT_PARAMS });
  }

  public presign(
    request: HttpRequest,
    options?: Omit<RequestPresigningArguments, 'expiresIn'>
  ): Promise<HttpRequest> {
    return super.presign(request, {
      ...options,
      expiresIn: REQUEST_EXPIRY,
      // `headers` that should not be signed. Transcribe-streaming WebSocket
      // request omits `headers` except for required `host` header. Signature
      // could be a mismatch if other `headers` are signed
      unsignableHeaders: new Set(
        Object.keys(request.headers).filter((header) => header !== 'host')
      ),
    });
  }
}
