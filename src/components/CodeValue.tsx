import * as React from 'react';

interface IProps {
  children: React.ReactNode;
}

export const Value: React.SFC<IProps> = ({ children }) => (
  <span>
    {'"'}
    <span className="value">{children}</span>
    {'" '}
  </span>
);
