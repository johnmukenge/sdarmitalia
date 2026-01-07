/**
 * @file APIContext.jsx
 * @description Context API per condividere apiClient in tutta l'app
 * @version 1.0
 */

import { createContext, useContext } from "react";
import apiClient from "../services/apiClient";

const APIContext = createContext();

/**
 * Provider per il contesto API
 */
export const APIProvider = ({ children }) => {
  return (
    <APIContext.Provider value={apiClient}>{children}</APIContext.Provider>
  );
};

/**
 * Hook personalizzato per usare l'API client
 * @returns {Object} istanza di apiClient
 */
export const useAPI = () => {
  const context = useContext(APIContext);
  if (!context) {
    throw new Error("useAPI deve essere usato dentro APIProvider");
  }
  return context;
};
