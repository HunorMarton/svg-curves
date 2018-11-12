import * as React from 'react';
import {Tag} from './CodeTag';
import {Attribute} from './CodeAttribute';
import {Value }from './CodeValue';
import './Code.css';

interface IProps {
    width: number;
    children: React.ReactText[];
}


export const Code: React.SFC<IProps> = ({ width, children }) => (
  <div className="code" style={{ width }}>
    <pre>
      <Tag type="opening">svg</Tag>
      <Attribute>width</Attribute>
      <Value>450</Value>
      <Attribute>height</Attribute>
      <Value>450</Value>
      <Attribute>xmlns</Attribute>
      <Value>http://www.w3.org/2000/svg</Value>&gt;
    </pre>
    <pre className="level1">
      <Tag type="opening">path</Tag>
    </pre>
    <pre className="level2">
      <Attribute>d</Attribute>
      <Value>{children}</Value>
      {'\n'}
      <Attribute>stroke</Attribute>
      <Value>white</Value>
      <Attribute>stroke-width</Attribute>
      <Value>20</Value>
      <Attribute>fill</Attribute>
      <Value>none</Value>
      /&gt;
    </pre>
    <pre>
      <Tag type="closing">svg</Tag>
    </pre>
  </div>
);
