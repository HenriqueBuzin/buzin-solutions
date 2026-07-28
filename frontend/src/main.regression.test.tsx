import { waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

describe('main', () => {
  it('mounts the application in the root element', async () => {
    document.body.innerHTML = '<div id="root"></div>';
    await import('./main');

    await waitFor(() => {
      expect(document.getElementById('root')?.childElementCount).toBeGreaterThan(0);
    });
  });

  it('rejects a page without the root element', async () => {
    vi.resetModules();
    document.body.innerHTML = '';

    await expect(import('./main')).rejects.toThrow('Elemento raiz nao encontrado');
  });
});
