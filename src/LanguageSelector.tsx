import { useLanguage } from "@/context/LanguageContext";
import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { FixedSizeList } from "react-window";

interface LanguageSelectorProps {
  languages?: { code: string; name: string }[];
  selectedLanguage: string;
  onLanguageChange: (language: string) => void;
  className?: string;
  style?: React.CSSProperties;
  buttonBgColor?: string;
  buttonTextColor?: string;
  buttonFontSize?: string;
  buttonPadding?: string;
  dropdownBgColor?: string;
  dropdownTextColor?: string;
  dropdownFontSize?: string;
  dropdownPadding?: string;
}

const LanguageSelector = ({
  languages = [
    { code: "ar", name: "Arabic" },
    { code: "en", name: "English" },
    { code: "fr", name: "French" },
    { code: "es", name: "Spanish" },
    { code: "de", name: "German" },
    { code: "it", name: "Italian" },
    { code: "ja", name: "Japanese" },
    { code: "ko", name: "Korean" },
    { code: "zh-CN", name: "Chinese Simplified" },
    { code: "zh-TW", name: "Chinese Traditional" },
  ],
  className = "",
  style = {},
  buttonBgColor = "bg-gray-200 dark:bg-slate-800",
  buttonTextColor = "",
  buttonFontSize = "",
  buttonPadding = "p-2 px-3",
  dropdownBgColor = "bg-blue-100 dark:bg-slate-700",
  dropdownTextColor = "",
  dropdownFontSize = "",
  dropdownPadding = "py-2",
}: LanguageSelectorProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { selectedLanguage, handleLanguageChange } = useLanguage();

  let name;
  const matchedLanguage = languages.find((l) => l.code === selectedLanguage);
  if (matchedLanguage) {
    name = matchedLanguage.name;
  } else {
    name = "English";
  }

  const DropdownItem = ({ index, style }: { index: number; style: React.CSSProperties }) => {
    const language = languages[index];
    return (
      <button
        type="button"
        className={`block w-full px-4 py-2 text-left transition-all hover:bg-gray-100 focus:bg-gray-100 dark:hover:bg-gray-500 ${
          selectedLanguage === language.code ? "!text-green-600" : ""
        } ${dropdownTextColor} ${dropdownFontSize}`}
        onClick={() => handleLanguageChange(language.code)}
        style={style}
      >
        {language.name}
      </button>
    );
  };

  return (
    <div className={`relative ml-4 inline-block ${className}`} style={style}>
      <button
        className={`${buttonBgColor} rounded-full ${buttonPadding} flex items-center gap-3 ${buttonTextColor} ${buttonFontSize}`}
        onClick={() => setIsOpen(!isOpen)}
        type="button"
      >
        <span className="mr-2">{name}</span>
        <FaChevronDown />
      </button>
      {isOpen && (
        <div className={`absolute right-0 z-10 mt-2 w-48 ${dropdownBgColor} rounded-md shadow-xl ${dropdownPadding}`}>
          <FixedSizeList height={200} itemCount={languages.length} itemSize={40} width={200}>
            {DropdownItem}
          </FixedSizeList>
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;