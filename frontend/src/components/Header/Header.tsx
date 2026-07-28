import { useTranslation } from 'react-i18next';
import './Header.css';

function Header(): React.JSX.Element {
  const { t } = useTranslation();

  return (
    <header className="header">
      <nav>
        <ul>
          <li>
            <a href="#portfolio">{t('portfolio')}</a>
          </li>
          <li>
            <a href="#contact">{t('contact')}</a>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
