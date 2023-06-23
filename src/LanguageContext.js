import { useState, useEffect, useMemo } from "react";
import { createContext, useContext } from "react";

export const LanguageContext = createContext();
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const userLanguage = typeof navigator !== "undefined" && navigator.language;
  const [selectedLanguage, setSelectedLanguage] = useState(
    (typeof window !== "undefined" &&
      window.localStorage.getItem("selectedLanguage")) ||
      userLanguage 
  );

  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
    typeof window !== "undefined" &&
      window.localStorage.setItem("selectedLanguage", language);
  };

  useEffect(() => {
    if (typeof window !== "undefined" && selectedLanguage) {
      typeof window !== "undefined" &&
        window.localStorage.setItem("selectedLanguage", selectedLanguage);
    }
  }, [selectedLanguage]);

  const value = useMemo(() => {
    return {
      selectedLanguage,
      handleLanguageChange,
    };
  }, [selectedLanguage, handleLanguageChange]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};