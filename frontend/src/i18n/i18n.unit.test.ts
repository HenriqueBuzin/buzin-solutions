import { describe, expect, it } from 'vitest';
import i18n, { resolveLanguage } from './i18n';

describe('i18n', () => {
  it.each([
    ['it', 'localhost', 'it'],
    [undefined, 'buzin.com.br', 'pt-BR'],
    [undefined, 'buzin.com', 'en-US'],
    [undefined, 'buzin.it', 'it'],
    [undefined, 'localhost', 'en-US'],
  ])('resolves %s and %s as %s', (environmentLanguage, hostname, expected) => {
    expect(resolveLanguage(environmentLanguage, hostname)).toBe(expected);
  });

  it('loads every supported translation', () => {
    expect(i18n.getResource('pt-BR', 'translation', 'portfolio')).toBe('Portfólio');
    expect(i18n.getResource('en-US', 'translation', 'portfolio')).toBe('Portfolio');
    expect(i18n.getResource('it', 'translation', 'portfolio')).toBe('Portafoglio');
  });
});
