import { useTranslation } from 'react-i18next';
import logo from './logo.png';
import './Main.css';

function Main(): React.JSX.Element {
  const { t } = useTranslation();

  return (
    <div className="content">
      <img src={logo} alt="Logo" className="logo" />
      <p className="tagline">{t('The sky is the limit')}&nbsp;</p>
    </div>
  );
}

export default Main;
