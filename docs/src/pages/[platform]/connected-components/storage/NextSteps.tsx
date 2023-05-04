import { CardLink, CardLinkGroup } from '@/components/CardLink';
import { MdCloudUpload } from 'react-icons/md';

export function NextSteps() {
  return (
    <CardLinkGroup title="Next steps" id="next-steps">
      <CardLink
        title="Storage Manager component"
        icon={<MdCloudUpload />}
        href={`storage/storagemanager`}
        desc="Let your users upload files to the cloud"
      />
    </CardLinkGroup>
  );
}
