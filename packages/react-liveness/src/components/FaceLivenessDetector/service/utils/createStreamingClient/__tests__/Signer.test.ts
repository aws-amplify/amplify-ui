import { SignatureV4 } from '@smithy/signature-v4';
import { AwsCredentialIdentity, HttpRequest } from '@smithy/types';

import { REQUEST_EXPIRY, Signer } from '../Signer';

const signatureV4PresignSpy = jest
  .spyOn(SignatureV4.prototype, 'presign')
  .mockImplementation();

const credentials: AwsCredentialIdentity = {
  accessKeyId: 'accessKeyId',
  secretAccessKey: 'secretAccessKey',
};

describe('Signer.presign', () => {
  let signer: Signer;

  beforeEach(() => {
    signer = new Signer({
      region: 'region',
      credentials,
      sha256: jest.fn(),
      service: 'rekognition',
    });
    signatureV4PresignSpy.mockClear();
  });

  it('calls SignatureV4.presign with the expected value of expiresIn', () => {
    const request = { headers: { host: 'host' } } as unknown as HttpRequest;
    const unxpectedOptions = { expiresIn: 60 };

    // @ts-expect-error `expiresIn` is omitted from `signer.presign` options
    signer.presign(request, unxpectedOptions);

    const unsignableHeaders = new Set();
    const expectedOptions = { expiresIn: REQUEST_EXPIRY, unsignableHeaders };

    expect(signatureV4PresignSpy).toHaveBeenCalledWith(
      request,
      expectedOptions
    );
    expect(signatureV4PresignSpy).not.toHaveBeenCalledWith(
      request,
      unxpectedOptions
    );
  });

  it('filters host headers from unsignableHeaders passed to SignatureV4.presign', () => {
    const request = {
      headers: { host: 'host', notHost: 'notHost' },
    } as unknown as HttpRequest;

    signer.presign(request);

    const unsignableHeaders = new Set(['notHost']);
    const expectedOptions = { unsignableHeaders, expiresIn: REQUEST_EXPIRY };

    expect(signatureV4PresignSpy).toHaveBeenCalledWith(
      request,
      expectedOptions
    );
  });
});
