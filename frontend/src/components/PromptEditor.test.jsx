import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import PromptEditor from './PromptEditor.jsx';

describe('PromptEditor', () => {
  it('renders textarea', () => {
    render(<PromptEditor value="" onChange={() => {}} />);
    const textarea = screen.getByPlaceholderText(/Scrivi il tuo prompt/i);
    expect(textarea).toBeInTheDocument();
  });
});
