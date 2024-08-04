import React from 'react';
import { downloadData } from 'aws-amplify/storage';

import { useControl } from '../../context/controls';
import { useConfig } from '../../context/config';
import { StorageBrowserElements } from '../../context/elements';
import { CLASS_BASE } from '../constants';

const { Button: ButtonElement, Icon: IconElement } = StorageBrowserElements;

interface AWSCredentials {
  accessKeyId: string;
  secretAccessKey: string;
  sessionToken?: string;
  expiration?: Date;
}

type LocationCredentialsProvider = (options?: {
  forceRefresh?: boolean;
}) => Promise<{
  credentials: AWSCredentials;
}>;

interface DownloadActionInput {
  key: string;
  options: {
    bucket: { bucketName: string; region: string };
    locationCredentialsProvider: LocationCredentialsProvider;
  };
}

interface DownloadActionResult {
  key: string;
}

function downloadAction(
  _: DownloadActionResult,
  { key: path, options }: DownloadActionInput
): Promise<DownloadActionResult> {
  downloadData({
    path,
    options,
  });
  return Promise.resolve({ key: path });
}

const BLOCK_NAME = `${CLASS_BASE}__download`;

export interface DownloadControl<
  T extends StorageBrowserElements = StorageBrowserElements,
> {
  (props: { imgKey: string }): React.JSX.Element;
  Button: T['Button'];
  Icon: T['Icon'];
}

const DownloadIcon: typeof IconElement = React.forwardRef(
  function DownloadIcon(props, ref) {
    return (
      <IconElement
        {...props}
        ref={ref}
        className={`${BLOCK_NAME}__icon`}
        variant="download"
      />
    );
  }
);

const DownloadButton: typeof ButtonElement = React.forwardRef(
  function DownloadButton(props, ref) {
    return (
      <ButtonElement
        {...props}
        ref={ref}
        className={BLOCK_NAME}
        aria-label="Download item"
        onClick={props.onClick}
      />
    );
  }
);

export const DownloadControl: DownloadControl = ({ imgKey }) => {
  const { getLocationCredentials, region } = useConfig();
  const [{ location }] = useControl({ type: 'NAVIGATE' });

  const { bucket: bucketName, permission, scope } = location ?? {};

  const downloadActionInput: DownloadActionInput = {
    key: imgKey,
    options: {
      bucket: { bucketName: bucketName, region },
      locationCredentialsProvider: async () =>
        await getLocationCredentials({ permission, scope }),
    },
  };

  return (
    <DownloadButton
      onClick={() => {
        downloadAction(
          undefined as unknown as DownloadActionResult,
          downloadActionInput
        );
      }}
    >
      <DownloadIcon />
    </DownloadButton>
  );
};

DownloadControl.Button = DownloadButton;
DownloadControl.Icon = DownloadIcon;
