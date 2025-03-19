// File: components/ThemeToggle.tsx
import React from 'react';
import { motion } from 'framer-motion';

type ThemeToggleProps = {
  darkMode: boolean;
  setDarkMode: (isDark: boolean) => void;
};

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ darkMode, setDarkMode }) => {
  return (
    <motion.button
      onClick={() => setDarkMode(!darkMode)}
      className="neo-button py-2 px-4 flex items-center"
      aria-label="Toggle dark mode"
      whileTap={{ scale: 0.9 }} // Animasi saat tombol ditekan
      transition={{ type: 'spring', stiffness: 300 }} // Efek spring
    >
      {darkMode ? '☀️' : '🌙'}
    </motion.button>
  );
};