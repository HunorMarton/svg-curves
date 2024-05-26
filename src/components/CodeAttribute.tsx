import * as React from "react";

interface CodeAttributeProps {
  children: React.ReactNode;
}

export const Attribute: React.FC<CodeAttributeProps> = ({ children }) => (
  <span>
    <span className="attribute">{children}</span>=
  </span>
);
