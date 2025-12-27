import { jest } from '@jest/globals';
import React from 'react';
import { useRouter } from 'next/router';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import AuthUser from '../pages/prog_parse_tags/auth/AuthUser';

// Mock useRouter
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('AuthUser', () => {
  let push;

  beforeEach(() => {
    push = jest.fn();
    useRouter.mockReturnValue({ push });
    localStorage.clear();
  });

  test('renders AuthUser component', () => {
    render(<AuthUser />);
    expect(screen.getByLabelText(/Username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(screen.getByText(/they will be created automatically on first sign-in/i)).toBeInTheDocument();
  });

  test('displays error message when fields are empty on login', () => {
    render(<AuthUser />);
    fireEvent.click(screen.getByText(/Sign in or create an account/i));
    expect(screen.getByText(/Username and password are required./i)).toBeInTheDocument();
  });

  test('successful login redirects to /auth', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ success: true, accessToken: 'fake-token' }),
      })
    );

    render(<AuthUser />);
    fireEvent.change(screen.getByLabelText(/Username/i), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'testpassword' } });

    fireEvent.click(screen.getByText(/Sign in or create an account/i));

    await waitFor(() => {
      expect(localStorage.getItem('token')).toBe('fake-token');
      expect(push).toHaveBeenCalledWith('/auth');
    });
  });

  test('displays error message on failed login', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ success: false, message: 'Invalid credentials' }),
      })
    );

    render(<AuthUser />);
    fireEvent.change(screen.getByLabelText(/Username/i), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'testpassword' } });

    fireEvent.click(screen.getByText(/Sign in or create an account/i));

    await screen.findByText(/Invalid credentials/i);

    expect(screen.getByText(/Invalid credentials/i)).toBeInTheDocument();
  });

});
