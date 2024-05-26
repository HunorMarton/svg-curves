import * as React from "react";

interface CodeValueProps {
  children: React.ReactNode;
}

export const Value: React.FC<CodeValueProps> = ({ children }) => (
  <span>
    {'"'}
    <span className="value">{children}</span>
    {'" '}
  </span>
);
