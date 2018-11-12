import * as React from 'react';

interface IProps {
  children: React.ReactNode;
  type: 'opening' | 'closing';
}

export const Tag: React.SFC<IProps> = ({ children, type }) => (
  <span>
    {type === 'opening' && '<'}
    {type === 'closing' && '</'}
    <span className="tag">{children}</span>
    {type === 'opening' && ' '}
    {type === 'closing' && '>'}
  </span>
);
