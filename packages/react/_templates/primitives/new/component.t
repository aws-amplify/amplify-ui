---
to: src/primitives/<%= name %>/<%= name %>.tsx
---
import * as React from 'react';
import { <%= name %>Props } from "../types";

export const <%= name %>: React.FC<<%= name %>Props> = ({ children }) => {
  return (
    <div>Hello!, I'm a <%= name %> component</div>
  );
};
