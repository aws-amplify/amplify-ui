import React from 'react';

export const Switch = (props) => {
  return (
    <label className={'amplify-switch'}>
      <input className={'sr-only'} />
      <span className={'track'}>
        <span className={'thumb'}></span>
      </span>
    </label>
  );
};
