
import React from 'react';

interface QuoteBlockProps {
  quote: string;
  author: string;
  title?: string;
  className?: string;
}

const QuoteBlock: React.FC<QuoteBlockProps> = ({ quote, author, title, className = '' }) => {
  return (
    <div className={`quote-block ${className}`}>
      <blockquote className="text-lg md:text-xl leading-relaxed text-atn-black/90 mb-4 italic font-medium">
        {quote}
      </blockquote>
      <footer className="text-right">
        <cite className="not-italic">
          <span className="text-atn-red font-semibold text-lg">— {author}</span>
          {title && (
            <span className="block text-atn-blue text-sm mt-1 font-medium">{title}</span>
          )}
        </cite>
      </footer>
    </div>
  );
};

export default QuoteBlock;
