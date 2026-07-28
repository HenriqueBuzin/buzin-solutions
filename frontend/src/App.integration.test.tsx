import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import App from './App';
import i18n from './i18n/i18n';

describe('App', () => {
  it('renders the complete landing page', () => {
    render(<App />);

    expect(document.title).toBe('Buzin Solutions');
    expect(screen.getByRole('img', { name: 'Logo' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: i18n.t('portfolio') })).toHaveAttribute(
      'href',
      '#portfolio',
    );
    expect(screen.getByRole('link', { name: i18n.t('contact') })).toHaveAttribute(
      'href',
      '#contact',
    );
    expect(screen.getByText(i18n.t('The sky is the limit'), { exact: false })).toBeInTheDocument();
    expect(document.querySelector('#portfolio')).toBeInTheDocument();
    expect(document.querySelector('.main-container')).toHaveStyle({
      backgroundImage: 'url("http://localhost:3004/src/components/Background/universe.gif")',
    });
  });
});
