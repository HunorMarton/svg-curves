import * as React from 'react';
import './PageAbout.css';

export default function AboutPage() {
  return (
    <div className="about">
      <h2>SVG Curves</h2>
      <p>Interactive SVG tutorial using React, Redux and RxJS.</p>
      <h4>Source</h4>
      <code>
        <a href="https://github.com/HunorMarton/SVGCurves">
          https://github.com/HunorMarton/SVGCurves
        </a>
      </code>
      <h4>This app is based on the following Drag & Drop template</h4>
      <code>
        <a href="https://github.com/HunorMarton/drag-and-drop">
          https://github.com/HunorMarton/drag-and-drop
        </a>
      </code>
      <h4>Made By</h4>
      <p>
        <a href="https://www.linkedin.com/in/hunor-marton-borbely/" target="blank">
          Hunor Márton Borbély
        </a>
      </p>
      <p>2018</p>
    </div>
  );
}
