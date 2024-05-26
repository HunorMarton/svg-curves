import * as React from "react";

interface CodeTagProps {
  children: React.ReactNode;
  type: "opening" | "closing";
}

export const Tag: React.FC<CodeTagProps> = ({ children, type }) => (
  <span>
    {type === "opening" && "<"}
    {type === "closing" && "</"}
    <span className="tag">{children}</span>
    {type === "opening" && " "}
    {type === "closing" && ">"}
  </span>
);
