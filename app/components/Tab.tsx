import React from 'react';

type TabProps = {
  isActive: boolean;
  onClick: () => void;
  label: string;
};

export const Tab: React.FC<TabProps> = ({ isActive, onClick, label }) => {
  return (
    <button
      onClick={onClick}
      className={`py-2 px-4 font-medium transition-all ${
        isActive 
        ? 'neo-button-active bg-black text-white' 
        : 'neo-button bg-white hover:bg-gray-100'
      }`}
    >
      {label}
    </button>
  );
};