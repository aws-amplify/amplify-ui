import React from 'react';
import { Button, Flex, Text } from '@aws-amplify/ui-react';

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  disabled?: boolean;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  disabled = false,
}) => {
  if (totalPages <= 1) return null;

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <Flex
      alignItems="center"
      justifyContent="center"
      gap="small"
      padding="medium"
    >
      <Button
        size="small"
        variation="link"
        onClick={handlePrevious}
        isDisabled={disabled || currentPage <= 1}
      >
        Previous
      </Button>

      <Text fontSize="small">
        Page {currentPage} of {totalPages}
      </Text>

      <Button
        size="small"
        variation="link"
        onClick={handleNext}
        isDisabled={disabled || currentPage >= totalPages}
      >
        Next
      </Button>
    </Flex>
  );
};
