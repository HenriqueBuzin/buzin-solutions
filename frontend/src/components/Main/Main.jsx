import React from 'react';
import { useTranslation } from 'react-i18next';
import './Main.css';
import logo from './logo.png';

const Main = () => {
  const { t } = useTranslation();  // Hook para acessar a função de tradução

  return (
    <div className="content">
      <img src={logo} alt="Logo" className="logo"/>
      <p className="tagline">{t('The sky is the limit')}&nbsp;</p>
    </div>
  );
};

export default Main;
