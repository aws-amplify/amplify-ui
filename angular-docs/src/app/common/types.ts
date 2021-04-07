import { Type } from '@angular/core';

export type DocRoute = {
  path: string;
  name: string;
  component: Type<any>;
};

export type DocRoutes = DocRoute[];
