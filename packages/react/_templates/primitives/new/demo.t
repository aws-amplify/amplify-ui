---
to: src/primitives/<%= name %>/demo.tsx
---
import React from 'react';

export const <%= h.capitalize(name) %>Demo = () => {
    return <<%= h.capitalize(name) %>/>;
};
