import { CardLink, CardLinkGroup } from '@/components/CardLink';
import { MdCloudUpload } from 'react-icons/md';

export function NextSteps() {
  return (
    <CardLinkGroup title="Next steps" id="next-steps">
      <CardLink
        title="File Uploader component"
        icon={<MdCloudUpload />}
        href={`storage/fileuploader`}
        desc="Let your users upload files to the cloud"
      />
    </CardLinkGroup>
  );
}
