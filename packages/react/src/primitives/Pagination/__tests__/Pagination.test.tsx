import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';

import { Pagination } from '../Pagination';
import { ELLIPSIS } from '../useRange';
import { ComponentClassNames } from '../../shared';
import { PaginationItem } from '../PaginationItem';

describe('Pagination component test suite', () => {
  const id = 'my-pagination';
  describe('Test Pagination', () => {
    it('should render pagination with provided props', async () => {
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
      const pagination = await screen.findByRole('navigation');
      expect(pagination.id).toBe(id);
      expect(pagination.nodeName).toBe('UL');
      expect(pagination.getAttribute('aria-label')).toBe(
        'Pagination Navigation'
      );
      expect(pagination.childNodes.length).toBe(6);
      expect(pagination.classList[0]).toBe(ComponentClassNames.Pagination);

      const firstPage = await screen.findByLabelText('Go to page 1');
      expect(firstPage.getAttribute('aria-current')).toBe('page');
      expect(firstPage.childNodes.length).toBe(1);
      expect(firstPage.childNodes[0].textContent).toBe('1');

      const lastPage = await screen.findByLabelText('Go to page 5');
      expect(lastPage.childNodes.length).toBe(1);
      expect(lastPage.childNodes[0].textContent).toBe('5');
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

      const previous = await screen.findByLabelText('Go to previous page');
      expect(previous.childNodes.length).toBe(1);
      expect(previous.getAttribute('aria-disabled')).toBe('true');

      const next = await screen.findByLabelText('Go to next page');
      expect(next.childNodes.length).toBe(1);
      expect(next.getAttribute('aria-disabled')).toBe('false');
    });

    it('should enable previous page button but disable next page button if current page is the last page', async () => {
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

      const previous = await screen.findByLabelText('Go to previous page');
      expect(previous.childNodes.length).toBe(1);
      expect(previous.getAttribute('aria-disabled')).toBe('false');

      const next = await screen.findByLabelText('Go to next page');
      expect(next.childNodes.length).toBe(1);
      expect(next.getAttribute('aria-disabled')).toBe('true');
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

      const previous = await screen.findByLabelText('Go to previous page');
      expect(previous.childNodes.length).toBe(1);
      expect(previous.getAttribute('aria-disabled')).toBe('false');

      const next = await screen.findByLabelText('Go to next page');
      expect(next.childNodes.length).toBe(1);
      expect(next.getAttribute('aria-disabled')).toBe('false');
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
      const pageTwo = await screen.findByLabelText('Go to page 2');
      userEvent.click(pageTwo);
      expect(mockOnChange).toHaveBeenCalledTimes(1);
      expect(mockOnChange).toHaveBeenCalledWith(2, 3);

      // click on page 3
      const pageThree = await screen.findByLabelText('Go to page 3');
      userEvent.click(pageThree);
      expect(mockOnChange).toHaveBeenCalledTimes(2);
      expect(mockOnChange).toHaveBeenCalledWith(3, 3);

      // click on page 4
      const pageFour = await screen.findByLabelText('Go to page 4');
      userEvent.click(pageFour);
      expect(mockOnChange).toHaveBeenCalledTimes(3);
      expect(mockOnChange).toHaveBeenCalledWith(4, 3);

      // click on previous page button
      const previous = await screen.findByLabelText('Go to previous page');
      userEvent.click(previous);
      expect(mockOnPrevious).toHaveBeenCalledTimes(1);
      expect(mockOnPrevious).toHaveBeenCalledWith(2);

      // click on next page button
      const next = await screen.findByLabelText('Go to next page');
      userEvent.click(next);
      expect(mockOnNext).toHaveBeenCalledTimes(1);
      expect(mockOnNext).toHaveBeenCalledWith(4);
    });
  });

  describe('Test PaginationItem', () => {
    it('should render page item with provided porps', async () => {
      const mockOnClick = jest.fn();
      render(
        <PaginationItem
          type="page"
          page={1}
          ariaCurrent="page"
          ariaLabel="Go to page 1"
          currentPage={1}
          onClick={mockOnClick}
        />
      );

      const pageItem = await screen.findByLabelText('Go to page 1');
      expect(pageItem.nodeName).toBe('LI');
      expect(pageItem.getAttribute('aria-current')).toBe('page');
      const textContainer = await screen.findByText('1');
      expect(textContainer.nodeName).toBe('A');
      expect(textContainer.innerHTML).toBe('1');

      userEvent.click(pageItem);
      expect(mockOnClick).toHaveBeenCalledTimes(1);
      expect(mockOnClick).toHaveBeenCalledWith(1, 1);
    });

    it('should render previous page button with provided porps', async () => {
      const mockOnClick = jest.fn();
      render(
        <PaginationItem
          type="previous"
          ariaDisabled={false}
          ariaLabel="Go to previous page"
          currentPage={2}
          onClick={mockOnClick}
        />
      );

      const previous = await screen.findByLabelText('Go to previous page');
      expect(previous.nodeName).toBe('LI');
      expect(previous.getAttribute('aria-disabled')).toBe('false');

      userEvent.click(previous);
      expect(mockOnClick).toHaveBeenCalledTimes(1);
      expect(mockOnClick).toHaveBeenCalledWith(1);
    });

    it('should render next page button with provided porps', async () => {
      const mockOnClick = jest.fn();
      render(
        <PaginationItem
          type="next"
          ariaDisabled={false}
          ariaLabel="Go to next page"
          currentPage={2}
          onClick={mockOnClick}
        />
      );

      const previous = await screen.findByLabelText('Go to next page');
      expect(previous.nodeName).toBe('LI');
      expect(previous.getAttribute('aria-disabled')).toBe('false');

      userEvent.click(previous);
      expect(mockOnClick).toHaveBeenCalledTimes(1);
      expect(mockOnClick).toHaveBeenCalledWith(3);
    });

    it('should render ellipsis item with provided porps', async () => {
      render(<PaginationItem type="ellipsis" ariaLabel="ellipsis" />);

      const ellipsis = await screen.findByLabelText('ellipsis');
      expect(ellipsis.nodeName).toBe('LI');
      expect(ellipsis.innerHTML).toBe(ELLIPSIS);
    });
  });
});
