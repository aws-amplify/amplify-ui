import {
  Flex,
  PaginationProps,
  StepperField,
  SwitchField,
} from '@aws-amplify/ui-react';

export interface PaginationPropControlsProps extends PaginationProps {
  setCurrentPage: (
    value: React.SetStateAction<PaginationProps['currentPage']>
  ) => void;
  setTotalPages: (
    value: React.SetStateAction<PaginationProps['totalPages']>
  ) => void;
  setSiblingCount: (
    value: React.SetStateAction<PaginationProps['siblingCount']>
  ) => void;
  setHasMorePages: (
    value: React.SetStateAction<PaginationProps['hasMorePages']>
  ) => void;
  onNext: () => void;
  onPrevious: () => void;
  onChange: (newPageIndex: number, prevPageIndex: number) => void;
}

interface PaginationPropControlsInterface {
  (props: PaginationPropControlsProps): JSX.Element;
}

export const PaginationPropControls: PaginationPropControlsInterface = ({
  currentPage,
  setCurrentPage,
  totalPages,
  setTotalPages,
  siblingCount,
  setSiblingCount,
  hasMorePages,
  setHasMorePages,
}) => {
  return (
    <Flex direction="column">
      <StepperField
        label="Current Page"
        min={1}
        max={10}
        step={1}
        value={currentPage}
        onStepChange={setCurrentPage}
      />

      <StepperField
        label="Total Pages"
        min={10}
        max={20}
        step={1}
        value={totalPages}
        onStepChange={setTotalPages}
      />

      <StepperField
        label="Sibling Count"
        min={0}
        max={3}
        step={1}
        value={siblingCount}
        onStepChange={setSiblingCount}
      />

      <SwitchField
        label="Has More Pages"
        defaultChecked={hasMorePages}
        labelPosition="end"
        onChange={(event) =>
          setHasMorePages(
            event.target.checked as PaginationProps['hasMorePages']
          )
        }
      />
    </Flex>
  );
};
