import * as React from 'react';

interface IProps {
  children: React.ReactNode;
}

export const Attribute: React.SFC<IProps> = ({ children }) => (
  <span>
    <span className="attribute">{children}</span>=
  </span>
);
