import * as React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Pagination } from '../Pagination';
import { ComponentClassNames, SharedText } from '../../shared/constants';
import {
  PaginationItem,
  PAGINATION_CURRENT_TEST_ID,
  PAGINATION_ELLIPSIS_TEST_ID,
} from '../PaginationItem';

describe('Pagination component: ', () => {
  const id = 'my-pagination';
  it('should render pagination with provided props', async () => {
    const currentPage = 1;
    const totalPages = 5;
    render(
      <Pagination
        id={id}
        currentPage={currentPage}
        totalPages={totalPages}
        onChange={() => {}}
        onNext={() => {}}
        onPrevious={() => {}}
      />
    );
    const pagination = await screen.findByRole('navigation');
    expect(pagination.id).toBe(id);
    expect(pagination.nodeName).toBe('NAV');
    expect(pagination.childNodes.length).toBe(1);
    expect(pagination).toHaveClass(ComponentClassNames.Pagination);

    const firstPage = await screen.findByText('1');
    expect(firstPage).toHaveClass(ComponentClassNames.PaginationItemCurrent);

    const lastPage = await screen.findByLabelText(
      `${SharedText.PaginationItem.ariaLabel.goToPage} ${totalPages}`
    );
    expect(lastPage.childNodes.length).toBe(1);
    expect(lastPage).toHaveTextContent('5');
  });

  it('should forward ref to DOM element', async () => {
    const ref = React.createRef<HTMLDivElement>();
    render(
      <Pagination
        currentPage={1}
        id={id}
        onChange={() => {}}
        onNext={() => {}}
        onPrevious={() => {}}
        ref={ref}
        siblingCount={2}
        totalPages={10}
      />
    );

    await screen.findByRole('navigation');
    expect(ref.current.nodeName).toBe('NAV');
  });

  it('should disable previous page button but enable next page button if current page is the first page', async () => {
    render(
      <Pagination
        id={id}
        currentPage={1}
        totalPages={5}
        onChange={() => {}}
        onNext={() => {}}
        onPrevious={() => {}}
      />
    );

    const previous = await screen.findByLabelText(
      SharedText.PaginationItem.ariaLabel.goToPrevPage
    );
    expect(previous.nodeName).toBe('BUTTON');
    expect(previous.childNodes.length).toBe(1);
    expect(previous).toBeDisabled();

    const next = await screen.findByLabelText(
      SharedText.PaginationItem.ariaLabel.goToNextPage
    );
    expect(next.nodeName).toBe('BUTTON');
    expect(next.childNodes.length).toBe(1);
    expect(next).not.toBeDisabled();
  });

  it('should enable previous page button but disable next page button if current page is the last page and there are no more pages', async () => {
    render(
      <Pagination
        id={id}
        currentPage={5}
        totalPages={5}
        onChange={() => {}}
        onNext={() => {}}
        onPrevious={() => {}}
      />
    );

    const previous = await screen.findByLabelText(
      SharedText.PaginationItem.ariaLabel.goToPrevPage
    );
    expect(previous.childNodes.length).toBe(1);
    expect(previous).not.toBeDisabled();

    const next = await screen.findByLabelText(
      SharedText.PaginationItem.ariaLabel.goToNextPage
    );
    expect(next.childNodes.length).toBe(1);
    expect(next).toBeDisabled();
  });

  it('should enable previous page button and next page button if current page is the last page and there are more pages', async () => {
    render(
      <Pagination id={id} currentPage={5} totalPages={5} hasMorePages={true} />
    );

    const previous = await screen.findByLabelText(
      SharedText.PaginationItem.ariaLabel.goToPrevPage
    );
    expect(previous.childNodes.length).toBe(1);
    expect(previous).not.toBeDisabled();

    const next = await screen.findByLabelText(
      SharedText.PaginationItem.ariaLabel.goToNextPage
    );
    expect(next.childNodes.length).toBe(1);
    expect(next).not.toBeDisabled();
  });

  it('should enable both previous page button and next page button if current page is neither the first or last page', async () => {
    render(
      <Pagination
        id={id}
        currentPage={3}
        totalPages={5}
        onChange={() => {}}
        onNext={() => {}}
        onPrevious={() => {}}
      />
    );

    const previous = await screen.findByLabelText(
      SharedText.PaginationItem.ariaLabel.goToPrevPage
    );
    expect(previous.childNodes.length).toBe(1);
    expect(previous).not.toBeDisabled();

    const next = await screen.findByLabelText(
      SharedText.PaginationItem.ariaLabel.goToNextPage
    );
    expect(next.childNodes.length).toBe(1);
    expect(next).not.toBeDisabled();
  });

  it('should invoke related callback function if click on corresponding button', async () => {
    const mockOnChange = jest.fn();
    const mockOnNext = jest.fn();
    const mockOnPrevious = jest.fn();
    render(
      <Pagination
        id={id}
        currentPage={3}
        totalPages={5}
        onChange={mockOnChange}
        onNext={mockOnNext}
        onPrevious={mockOnPrevious}
      />
    );

    // click on page 2
    const page2 = 2;
    const pageTwo = await screen.findByLabelText(
      `${SharedText.PaginationItem.ariaLabel.goToPage} ${page2}`
    );
    userEvent.click(pageTwo);
    expect(mockOnChange).toHaveBeenCalledTimes(1);
    expect(mockOnChange).toHaveBeenCalledWith(2, 3);

    // current page
    const pageThree = await screen.findByText('3');
    userEvent.click(pageThree);
    expect(mockOnChange).toHaveBeenCalledTimes(1);
    expect(mockOnChange).toHaveBeenLastCalledWith(2, 3);

    // click on page 4
    const page4 = 4;
    const pageFour = await screen.findByLabelText(
      `${SharedText.PaginationItem.ariaLabel.goToPage} ${page4}`
    );
    userEvent.click(pageFour);
    expect(mockOnChange).toHaveBeenCalledTimes(2);
    expect(mockOnChange).toHaveBeenCalledWith(4, 3);

    // click on previous page button
    const previous = await screen.findByLabelText(
      SharedText.PaginationItem.ariaLabel.goToPrevPage
    );
    userEvent.click(previous);
    expect(mockOnPrevious).toHaveBeenCalledTimes(1);
    expect(mockOnPrevious).toHaveBeenCalledWith();

    // click on next page button
    const next = await screen.findByLabelText(
      SharedText.PaginationItem.ariaLabel.goToNextPage
    );
    userEvent.click(next);
    expect(mockOnNext).toHaveBeenCalledTimes(1);
    expect(mockOnNext).toHaveBeenCalledWith();
  });

  it('should render 11 items if sibling count is set to 2', async () => {
    render(
      <Pagination
        id={id}
        currentPage={1}
        totalPages={10}
        siblingCount={2}
        onChange={() => {}}
        onNext={() => {}}
        onPrevious={() => {}}
      />
    );

    const pagination = await screen.findByRole('navigation');
    expect(pagination.childNodes.length).toBe(1);
    const paginationItemList = pagination.childNodes[0];
    // To avoid resizing the component during interaction, the constant length should be
    // 1(first page) + 1(last page) + 1(current page) + 2 * siblingCount + 2(ellipses)
    expect(paginationItemList.childNodes.length).toBe(11);
  });

  it('should render 4 siblings around current page with 2 sibling count', async () => {
    render(
      <Pagination
        id={id}
        currentPage={5}
        totalPages={10}
        siblingCount={2}
        onChange={() => {}}
        onNext={() => {}}
        onPrevious={() => {}}
      />
    );
    const pagination = await screen.findByRole('navigation');
    // curent page
    expect(pagination).toHaveTextContent(
      SharedText.PaginationItem.invisibleLabel.currentPage
    );
    expect(pagination).toHaveTextContent('5');
    // sibling pages
    expect(pagination).toHaveTextContent('3');
    expect(pagination).toHaveTextContent('4');
    expect(pagination).toHaveTextContent('6');
    expect(pagination).toHaveTextContent('7');
  });

  it('should default the current page to 1 if one is not provided', async () => {
    render(
      <Pagination
        id={id}
        totalPages={10}
        siblingCount={2}
        onChange={() => {}}
        onNext={() => {}}
        onPrevious={() => {}}
      />
    );
    const currentPage = await screen.findByTestId(PAGINATION_CURRENT_TEST_ID);
    expect(currentPage).toHaveTextContent('1');
  });

  it('should be able to customize text label', async () => {
    const pageLabel = 'Jump to page';
    const currentPageLabel = 'The current page is:';
    const leftArrowLabel = 'Jump to previous page';
    const rightArrowLabel = 'Jump to next page';
    render(
      <Pagination
        id={id}
        currentPage={1}
        totalPages={3}
        pageLabel={pageLabel}
        currentPageLabel={currentPageLabel}
        leftArrowLabel={leftArrowLabel}
        rightArrowLabel={rightArrowLabel}
        onChange={() => {}}
        onNext={() => {}}
        onPrevious={() => {}}
      />
    );
    const previous = await screen.findByLabelText(leftArrowLabel);
    expect(previous).toHaveAttribute('aria-label', leftArrowLabel);

    const next = await screen.findByLabelText(rightArrowLabel);
    expect(next).toHaveAttribute('aria-label', rightArrowLabel);

    // page 1(current page)
    const current = await screen.findByText('1');
    expect(current).toHaveTextContent(currentPageLabel);

    // pages other than current page
    const page2Label = `${pageLabel} 2`;
    const page2 = await screen.findByLabelText(page2Label);
    expect(page2).toHaveTextContent('2');
    expect(page2).toHaveAttribute('aria-label', page2Label);

    const page3Label = `${pageLabel} 3`;
    const page3 = await screen.findByLabelText(page3Label);
    expect(page3).toHaveTextContent('3');
    expect(page3).toHaveAttribute('aria-label', page3Label);
  });

  describe('PaginationItem: ', () => {
    it('should render page item with provided props', async () => {
      const mockOnClick = jest.fn();
      const page = 1;
      const currentPage = 1;
      render(
        <PaginationItem
          type="page"
          page={page}
          ariaLabel={`${SharedText.PaginationItem.invisibleLabel.currentPage} ${page}`}
          currentPage={currentPage}
          onClick={mockOnClick}
        />
      );
      const pageItem = await screen.findByText('1');
      expect(pageItem.nodeName).toBe('SPAN');
      expect(pageItem).toHaveClass(ComponentClassNames.PaginationItemCurrent);
      const invisibleLabel = await screen.findByText(
        SharedText.PaginationItem.invisibleLabel.currentPage
      );
      expect(invisibleLabel).toHaveClass(ComponentClassNames.VisuallyHidden);

      userEvent.click(pageItem);
      expect(mockOnClick).not.toHaveBeenCalled();
    });
    it('should render previous page button with provided props', async () => {
      const mockOnClick = jest.fn();
      render(
        <PaginationItem
          type="previous"
          ariaLabel={SharedText.PaginationItem.ariaLabel.goToPrevPage}
          currentPage={2}
          onClick={mockOnClick}
        />
      );
      const previous = await screen.findByLabelText(
        SharedText.PaginationItem.ariaLabel.goToPrevPage
      );
      expect(previous.nodeName).toBe('BUTTON');
      expect(previous).not.toBeDisabled();
      userEvent.click(previous);
      expect(mockOnClick).toHaveBeenCalledTimes(1);
      expect(mockOnClick).toHaveBeenCalledWith();
    });
    it('should render next page button with provided props', async () => {
      const mockOnClick = jest.fn();
      render(
        <PaginationItem
          type="next"
          ariaLabel={SharedText.PaginationItem.ariaLabel.goToNextPage}
          currentPage={2}
          onClick={mockOnClick}
        />
      );
      const previous = await screen.findByLabelText(
        SharedText.PaginationItem.ariaLabel.goToNextPage
      );
      expect(previous.nodeName).toBe('BUTTON');
      expect(previous).not.toBeDisabled();
      userEvent.click(previous);
      expect(mockOnClick).toHaveBeenCalledTimes(1);
      expect(mockOnClick).toHaveBeenCalledWith();
    });
    it('should render ellipsis item with provided props', async () => {
      render(<PaginationItem type="ellipsis" ariaLabel="ellipsis" />);
      const ellipsis = await screen.findByTestId(PAGINATION_ELLIPSIS_TEST_ID);
      expect(ellipsis.nodeName).toBe('SPAN');
      expect(ellipsis).toHaveClass(ComponentClassNames.PaginationItemEllipsis);
      expect(ellipsis.innerHTML).toBe('\u2026');
    });
  });
});
