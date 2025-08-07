'use client';
import { createContext, useContext, useState } from 'react';

const ChangeExamModalContext = createContext();

export const ChangeExamModalProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openChangeExamModal = () => setIsOpen(true);
  const closeChangeExamModal = () => setIsOpen(false);

  return (
    <ChangeExamModalContext.Provider value={{ isOpen, openChangeExamModal, closeChangeExamModal }}>
      {children}
    </ChangeExamModalContext.Provider>
  );
};

export const useChangeExamModal = () => {
  const context = useContext(ChangeExamModalContext);
  if (!context) {
    console.warn('useChangeExamModal must be used within a ChangeExamModalProvider');
  }
  return context;
};
