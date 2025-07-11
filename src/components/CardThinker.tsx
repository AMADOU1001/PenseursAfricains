
import React from 'react';
import { useNavigate } from 'react-router-dom';

interface CardThinkerProps {
  id: string;
  name: string;
  title: string;
  period?: string;
  description: string;
  imageUrl?: string;
  category?: string;
  className?: string;
  onClick?: () => void;
}

const CardThinker: React.FC<CardThinkerProps> = ({
  id,
  name,
  title,
  period,
  description,
  imageUrl,
  category,
  className = '',
  onClick
}) => {
  const navigate = useNavigate();

  const handleSeeMore = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/penseurs/${id}`);
  };

  return (
    <div
      className={`bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer hover:-translate-y-2 ${className}`}
      onClick={onClick}
    >
      {/* Image or Avatar */}
      <div className="h-48 bg-gradient-to-br from-atn-red to-atn-gold flex items-center justify-center relative overflow-hidden">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={name}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.src = "/African-thinkers-uploads/cac2f267-5795-48f3-983e-0efbcea45d23.png";
              e.currentTarget.className = "w-24 h-24 object-cover";
            }}
          />
        ) : (
          <img
            src="/African-thinkers-uploads/cac2f267-5795-48f3-983e-0efbcea45d23.png"
            alt={name}
            className="w-24 h-24 object-cover"
          />
        )}
        {category && (
          <div className="absolute top-3 right-3 bg-white/90 text-atn-green text-xs font-medium px-2 py-1 rounded-full">
            {category}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="mb-3">
          <h3 className="text-xl font-poppins font-bold text-atn-green mb-1">
            {name}
          </h3>
          <p className="text-atn-gold font-medium text-sm">
            {title}
          </p>
          {period && (
            <p className="text-atn-black/60 text-sm mt-1">
              {period}
            </p>
          )}
        </div>

        <p className="text-atn-black/80 text-sm leading-relaxed line-clamp-3">
          {description}
        </p>

        <div className="mt-4 pt-4 border-t border-gray-100">
          <button 
            className="text-atn-red hover:text-atn-red-dark font-medium text-sm transition-colors duration-200"
            onClick={handleSeeMore}
          >
            En savoir plus →
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardThinker;
