'use client';
import { createContext, useContext, useState } from 'react';

const SupportModalContext = createContext();

export const SupportModalProvider = ({ children }) => {
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <SupportModalContext.Provider value={{ isModalOpen, openModal, closeModal }}>
      {children}
    </SupportModalContext.Provider>
  );
};

export const useSupportModal = () => {
  const context = useContext(SupportModalContext);
  if (!context) {
    console.warn('useSupportModal must be used within a SupportModalProvider');
  }
  return context;
};
