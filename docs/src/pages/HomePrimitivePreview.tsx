import * as React from 'react';
import {
  Badge,
  Button,
  Flex,
  Tabs,
  TabItem,
  SliderField,
  Rating,
  SearchField,
  useTheme,
  ToggleButtonGroup,
  ToggleButton,
  Loader,
  Placeholder,
  Pagination,
  usePagination,
  SwitchField,
  CheckboxField,
  Divider,
  Menu,
  MenuItem,
  View,
} from '@aws-amplify/ui-react';
import {
  MdFormatAlignLeft,
  MdFormatAlignRight,
  MdFormatAlignCenter,
  MdFormatAlignJustify,
} from 'react-icons/md';

export const HomePrimitivePreview = () => {
  const [exclusiveValue, setExclusiveValue] = React.useState('align-left');
  const pagination = usePagination({
    currentPage: 1,
    totalPages: 10,
    siblingCount: 1,
  });
  const { tokens } = useTheme();

  return (
    <Flex direction="column" flex="1">
      <Flex
        direction={{
          base: 'column',
          large: 'row',
        }}
        alignItems="center"
      >
        <View>
          <Badge size="small" variation="success">
            Available
          </Badge>
          <Badge size="small" variation="info">
            New
          </Badge>
        </View>

        <Pagination {...pagination} />
      </Flex>
      <Flex
        direction={{
          base: 'column',
          large: 'row',
        }}
        padding={`0 0 0 ${tokens.space.medium}`}
        alignItems="center"
      >
        <ToggleButtonGroup
          value={exclusiveValue}
          isExclusive
          onChange={(value: string) => setExclusiveValue(value)}
        >
          <ToggleButton value="align-left" ariaLabel="align left">
            <MdFormatAlignLeft />
          </ToggleButton>
          <ToggleButton value="align-center" ariaLabel="align center">
            <MdFormatAlignCenter />
          </ToggleButton>
          <ToggleButton value="align-right" ariaLabel="align right">
            <MdFormatAlignRight />
          </ToggleButton>
          <ToggleButton value="align-justify" ariaLabel="align justify">
            <MdFormatAlignJustify />
          </ToggleButton>
        </ToggleButtonGroup>
        <Flex>
          <Button variation="primary">Get started</Button>
          <Menu ariaLabel="homepage demo dropdown menu">
            <MenuItem onClick={() => alert('Download')}>Download</MenuItem>
            <MenuItem onClick={() => alert('Create a Copy')}>
              Create a Copy
            </MenuItem>
            <MenuItem onClick={() => alert('Mark as Draft')}>
              Mark as Draft
            </MenuItem>
            <Divider />
            <MenuItem isDisabled onClick={() => alert('Delete')}>
              Delete
            </MenuItem>
            <MenuItem onClick={() => alert('Attend a workshop')}>
              Attend a workshop
            </MenuItem>
          </Menu>
        </Flex>
      </Flex>
      <Flex padding={{ base: 0, large: `0 0 0 ${tokens.space.xxl}` }}>
        <Placeholder />
      </Flex>
      <Flex
        alignItems="center"
        direction={{
          base: 'column',
          large: 'row',
        }}
        padding={{ base: 0, large: `0 0 0 ${tokens.space.xxl}` }}
      >
        <Tabs>
          <TabItem title="Tab 1">
            <p></p>
          </TabItem>
          <TabItem title="Tab 2">
            <p></p>
          </TabItem>
          <TabItem title="Tab 3" isDisabled={true}>
            <p></p>
          </TabItem>
        </Tabs>
        <Loader />
        <Rating value={4} />
      </Flex>
      <Flex
        direction={{
          base: 'column',
          large: 'row',
        }}
        alignItems={{ base: 'center', large: 'flex-start' }}
        padding={{ base: 0, large: `0 0 0 ${tokens.space.large}` }}
      >
        <SearchField placeholder="Search" label="Search" labelHidden={true} />
        <SwitchField label="Accept" />
        <SliderField
          label="Slider"
          defaultValue={50}
          min={0}
          max={100}
          step={1}
          labelHidden
        />
      </Flex>
      <Flex direction="row" alignItems="flex-start">
        <CheckboxField label="Pepperoni" defaultChecked={true} />
        <CheckboxField label="Bell Peppers" />
        <CheckboxField label="Mushrooms" />
      </Flex>
    </Flex>
  );
};
