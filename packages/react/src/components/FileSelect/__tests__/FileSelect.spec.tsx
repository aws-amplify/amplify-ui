import React from 'react';
import { act, render, screen, waitFor } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';

import { useFileSelect } from '../FileSelect';

const TestComponent = ({
  onSelect,
  type,
}: {
  onSelect: (files: File[]) => void;
  type: 'file' | 'folder';
}) => {
  const [fileSelect, handleSelect] = useFileSelect(onSelect);

  return (
    <>
      {fileSelect}
      <button
        onClick={() => {
          handleSelect(type);
        }}
      />
    </>
  );
};

describe('useFileSelect', () => {
  it.each(['file', 'folder'] as const)(
    'behaves as expected with a %s type as expected',
    async (type) => {
      const user = userEvent.setup();
      const onSelect = jest.fn();

      render(<TestComponent onSelect={onSelect} type={type} />);

      const button = screen.getByRole('button');

      await act(async () => {
        await user.click(button);
      });

      const input: HTMLInputElement | null = screen.queryByTestId(
        'amplify-file-select'
      );

      expect(input).toBeDefined();
      expect(input).not.toBeNull();

      const file = new File([], 'file one');
      await user.upload(input!, file);

      expect(input?.files?.[0]).toStrictEqual(file);

      expect(onSelect).toHaveBeenCalledTimes(1);
      expect(onSelect).toHaveBeenCalledWith([file]);
    }
  );
});
