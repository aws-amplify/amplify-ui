import {
  Link,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@aws-amplify/ui-react';
export function CustomizationTable() {
  return (
    <Table caption="" highlightOnHover={false}>
      <TableHead>
        <TableRow>
          <TableCell as="th">Component</TableCell>
          <TableCell as="th">Customizable?</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableCell>Text/Language</TableCell>
          <TableCell>
            <Link href="#internationalization-i18n">Link</Link>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Theme (colors, margin sizes, text sizes, etc)</TableCell>
          <TableCell>
            <Link href="#theming">Link</Link>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Get Ready Screen Header</TableCell>
          <TableCell>
            <Link href="#internationalization-i18n">Link</Link>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Get Ready Screen Photosensitivity Warning</TableCell>
          <TableCell>
            <Link href="#internationalization-i18n">Link</Link>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Get Ready Screen Instruction List</TableCell>
          <TableCell>
            <Link href="#internationalization-i18n">Link</Link>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Recording Icon</TableCell>
          <TableCell>No</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Countdown Timer</TableCell>
          <TableCell>No</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Face Match Timeout</TableCell>
          <TableCell>No</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Oval Placement/Size</TableCell>
          <TableCell>No</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            Colors or length of colors in sequence of colored lights
          </TableCell>
          <TableCell>No</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Cancel Button</TableCell>
          <TableCell>No</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
