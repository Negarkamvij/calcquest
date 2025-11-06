// components/LatexRenderer.js

import React from 'react';
import { InlineMath } from 'react-katex';
import 'katex/dist/katex.min.css'; // Don't forget to run 'npm install react-katex katex'

const LatexRenderer = ({ text }) => {
  if (!text) return null;

  // FIX: Unescape the backslashes added for JSON safety.
  // The string passed here contains two literal backslashes (\\) 
  // which must be reduced to a single backslash (\) for KaTeX.
  const unescapedText = text.replace(/\\\\/g, '\\'); 

  // Split the string by '$...$' to isolate math from regular text.
  const parts = unescapedText.split(/(\$[^\$]+\$)/g).filter(Boolean);

  return (
    <p>
      {parts.map((part, index) => {
        if (part.startsWith('$') && part.endsWith('$')) {
          // Extract the math content without the '$' delimiters
          const latexContent = part.slice(1, -1);
          
          return <InlineMath key={index} math={latexContent} />;
        }
        // Return plain text
        return <span key={index}>{part}</span>;
      })}
    </p>
  );
};

export default LatexRenderer;