import { createContext, useState } from "react";

export const LezionarioContext = createContext();

export const LezionarioProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <LezionarioContext.Provider value={{ darkMode, setDarkMode }}>
      {children}
    </LezionarioContext.Provider>
  );
};
