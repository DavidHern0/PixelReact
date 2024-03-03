import './Language.css';
import React, { useState, useEffect } from 'react';
import ClickSound from '../../assets/ClickSound.mp3';
import { languages, translate } from '../../utilities/variables';

const Language = (currentLanguage) => {
  
  let languageResult = currentLanguage.currentLanguage;
  const [selectedLanguage, setSelectedLanguage] = useState(languageResult);
  const clickSound = new Audio(ClickSound);
  clickSound.volume = 0.1;

  // Set first option in menu as selected
  useEffect(() => {
    setSelectedLanguage(languages[0]);
  }, [setSelectedLanguage]);

  const handleLanguageClick = (language) => {
    setSelectedLanguage(language);
  };

  // // Interact with menu
  const handleKeyPress = (e) => {
    if (e.key === 'ArrowUp') {
      clickSound.play();
      const currentIndex = languages.indexOf(selectedLanguage);
      const newIndex = currentIndex > 0 ? currentIndex - 1 : languages.length - 1;
      setSelectedLanguage(languages[newIndex]);
    } else if (e.key === 'ArrowDown') {
      clickSound.play();
      const currentIndex = languages.indexOf(selectedLanguage);
      const newIndex = currentIndex < languages.length - 1 ? currentIndex + 1 : 0;
      setSelectedLanguage(languages[newIndex]);
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [selectedLanguage]);

  useEffect(() => {
    const handleLanguageEvent = (event) => {
      if (event.code === 'KeyZ' || event.key === ' ' || event.key === 'Enter') {
        languageResult = selectedLanguage;
        console.log(languageResult)
      }
    };
    document.addEventListener('click', handleLanguageEvent);
    document.addEventListener('keydown', handleLanguageEvent);

    return () => {
      document.removeEventListener('click', handleLanguageEvent);
      document.removeEventListener('keydown', handleLanguageEvent);
    };
  }, [selectedLanguage]);

  return (
    <>
      <h2>{translate[languageResult]["SELECT OPTION"]}</h2>
      <ul className="languages-list">
        {languages.map((language) => (
          <li key={language} onClick={() => handleLanguageClick(language)} className={selectedLanguage === language ? 'selected' : ''}>
            {translate[languageResult][language]}
          </li>
        ))}
      </ul>
    </>
  );
};

export default Language;