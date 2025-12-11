import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Services from '../pages/Services';
import { describe, it, expect } from 'vitest';

describe('Services Page Mobile Layout', () => {
  it('renders fixed mobile buttons with correct colors', () => {
    render(
      <BrowserRouter>
        <Services />
      </BrowserRouter>
    );

    // Book Consultation Button (Left)
    // Expects bg-amber-500 (User Request)
    const bookBtn = screen.getByRole('link', { name: /Book Consultation/i });
    expect(bookBtn.getAttribute('class')).toContain('bg-amber-500');
    expect(bookBtn.getAttribute('class')).toContain('fixed');
    expect(bookBtn.getAttribute('class')).toContain('bottom-0');
    expect(bookBtn.getAttribute('class')).toContain('left-0');

    // WhatsApp Button (Right)
    // Expects bg-emerald-500 (User Edit in Step 406, overriding Agent's Black)
    const waBtn = screen.getByText(/Chat on WhatsApp/i);
    expect(waBtn.getAttribute('class')).toContain('bg-emerald-500');
    expect(waBtn.getAttribute('class')).toContain('fixed');
    expect(waBtn.getAttribute('class')).toContain('bottom-0');
    expect(waBtn.getAttribute('class')).toContain('right-0');
  });
});
