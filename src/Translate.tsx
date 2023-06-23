"use client";
import { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";

interface TranslateProps {
  children: string;
  defaultLanguage?: string;
  translations?: { [key: string]: string };
}

const Translate = ({
  children,
  translations = {},
  defaultLanguage = "en",
}: TranslateProps) => {
  const { selectedLanguage } = useLanguage();
  const [translatedText, setTranslatedText] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const translateText = async () => {
      if (selectedLanguage === defaultLanguage) {
        setTranslatedText(children);
        return;
      }

      if (translations[selectedLanguage]) {
        setTranslatedText(translations[selectedLanguage]);
        return;
      }

      try {
        const response = await fetch(
          `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${selectedLanguage}&dt=t&q=${children}`
        );
        const json = await response.json();
        const translatedText = json[0][0][0];
        setTranslatedText(translatedText);
        setError("");
      } catch (error) {
        console.error(error);
        setError("Error translating text.");
      }
    };

    translateText();
  }, [children, selectedLanguage, defaultLanguage, translations]);

  return (
    <>
      {translatedText}
      {error ? children : null}
    </>
  );
};

export default Translate