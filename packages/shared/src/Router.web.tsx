import React from 'react';
export * from 'react-router-dom';
export { BrowserRouter as Router } from 'react-router-dom';
import { Link as BrowserLink, LinkProps } from 'react-router-dom';

export declare interface ILinkProps extends LinkProps {
  styles: React.CSSProperties;
}

export function Link({ style, ...props }: ILinkProps): JSX.Element {
  return <BrowserLink styles={style} {...props} />;
}
