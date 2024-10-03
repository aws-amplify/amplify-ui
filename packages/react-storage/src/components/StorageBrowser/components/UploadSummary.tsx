import React from 'react';

import { displayText } from '../displayText/en';
import { ViewElement } from '../context/elements';
import { CLASS_BASE } from '../views/constants';
import { DescriptionList } from './DescriptionList';

interface UploadSummaryProps {
  total?: number;
  complete?: number;
  queued?: number;
  canceled?: number;
  failed?: number;
}

export const UploadSummary = ({
  total = 0,
  complete = 0,
  failed = 0,
  canceled = 0,
  queued = 0,
}: UploadSummaryProps): React.JSX.Element => (
  <ViewElement className={`${CLASS_BASE}__upload-summary`}>
    <DescriptionList
      descriptions={[
        {
          term: displayText.uploadSummaryCompleted,
          details: `${complete}/${total}`,
        },
        {
          term: displayText.uploadSummaryFailed,
          details: `${failed}/${total}`,
        },
        {
          term: displayText.uploadSummaryCanceled,
          details: `${canceled}/${total}`,
        },
        {
          term: displayText.uploadSummaryQueued,
          details: `${queued}/${total}`,
        },
      ]}
    />
  </ViewElement>
);
