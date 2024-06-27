import React from 'react';

export interface ActionContext<T extends string> {
  actions: T[];
  selectedAction: T | undefined;
  updateSelectedAction: (value: T | undefined) => void;
}

// think just passed in during "createPaginateContext"
// pageSize: number;
export interface PaginateContext {
  currentPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  updateCurrentPage: (value: number) => void;
}

const _DetailProvider = ({ children }: { children?: React.ReactNode }) => {
  return <form>{children}</form>;
};
