import React, { useState } from 'react';

export interface CreateFolderActionViewControls {
  (): React.JSX.Element;
}

export const CreateFolderActionViewControls: CreateFolderActionViewControls =
  () => {
    // temporary state just to test changes
    const [folderName, setFolderName] = useState('');

    return (
      <form
        onSubmit={(event) => {
          // @TODO: we will probably want to use context and handleUpdateState()
          // to send the folder name to so that it can be sent off to be created?

          event.preventDefault();

          // eslint-disable-next-line no-console
          console.log('create folder', folderName);
        }}
      >
        <label htmlFor="folder-name-input">Enter folder name:</label>
        <input
          type="text"
          id="folder-name-input"
          value={folderName}
          onChange={(event) => setFolderName(event.target.value)}
          required
        />
        <button type="submit">Create folder</button>
      </form>
    );
  };
