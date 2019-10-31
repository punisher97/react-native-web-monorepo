import React from 'react';
import { BreadProvider } from 'material-bread';
import Root from './Root';

export function App() {
  return (
    <BreadProvider>
      <Root />
    </BreadProvider>
  );
}

declare var global: any;
