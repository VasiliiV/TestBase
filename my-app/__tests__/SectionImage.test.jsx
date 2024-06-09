import React from 'react';
import { useRouter } from 'next/router';
import { render, screen } from '@testing-library/react';
import SectionImage from '../pages/prog_parse_tags/blog_for_image/SectionImage';

// Mock useRouter
jest.mock('next/router', () => ({
    useRouter: jest.fn(),
  }));

test('renders "Тут будет твоё имя" text', () => {
    render(<SectionImage />);
    const textElement = screen.getByText(/Тут будет твоё имя/i);
    expect(textElement).toBeInTheDocument();
  });