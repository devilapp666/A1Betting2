import React, { createContext, useContext, useState, ReactNode } from "react";

interface LoggerContextType {
  log: (message: string) => void;
  error: (message: string) => void;
  warn: (message: string) => void;
  info: (message: string) => void;
}

const LoggerContext = createContext<LoggerContextType | undefined>(undefined);

export const useLogger = () => {
  const context = useContext(LoggerContext);

  // If no provider, return a simple console logger
  if (!context) {
    return {
      log: (message: string) => console.log(message),
      error: (message: string) => console.error(message),
      warn: (message: string) => console.warn(message),
      info: (message: string) => console.info(message),
    };
  }

  return context;
};

interface LoggerProviderProps {
  children: ReactNode;
}

export const LoggerProvider: React.FC<LoggerProviderProps> = ({ children }) => {
  const logger = {
    log: (message: string) => console.log(message),
    error: (message: string) => console.error(message),
    warn: (message: string) => console.warn(message),
    info: (message: string) => console.info(message),
  };

  return React.createElement(
    LoggerContext.Provider,
    { value: logger },
    children,
  );
};
