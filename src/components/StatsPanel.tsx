
import React from 'react';
import CountUp from './CountUp';

interface StatItem {
  number: string;
  label: string;
  description?: string;
}

interface StatsPanelProps {
  stats: StatItem[];
  className?: string;
}

const StatsPanel: React.FC<StatsPanelProps> = ({ stats, className = '' }) => {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 ${className}`}>
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-white/80 backdrop-blur-sm rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
        >
          <div className="text-4xl lg:text-5xl font-poppins font-bold text-atn-red mb-2">
            <CountUp 
              to={parseInt(stat.number.replace(/[^\d]/g, '')) || 0}
              duration={2}
              delay={index * 200}
            />
          </div>
          <div className="text-atn-blue font-semibold text-lg mb-1">
            {stat.label}
          </div>
          {stat.description && (
            <div className="text-atn-black/70 text-sm">
              {stat.description}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default StatsPanel;
