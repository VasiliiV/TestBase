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
    expect(screen.getByPlaceholderText(/Имя пользователя/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Пароль/i)).toBeInTheDocument();
  });

  test('displays error message when fields are empty on login', () => {
    render(<AuthUser />);
    fireEvent.click(screen.getByText(/Войти/i));
    expect(screen.getByText(/Имя пользователя и пароль обязательны./i)).toBeInTheDocument();
  });

  test('successful login redirects to /auth', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ success: true, accessToken: 'fake-token' }),
      })
    );

    render(<AuthUser />);
    fireEvent.change(screen.getByPlaceholderText(/Имя пользователя/i), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByPlaceholderText(/Пароль/i), { target: { value: 'testpassword' } });

    fireEvent.click(screen.getByText(/Войти/i));

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
    fireEvent.change(screen.getByPlaceholderText(/Имя пользователя/i), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByPlaceholderText(/Пароль/i), { target: { value: 'testpassword' } });

    fireEvent.click(screen.getByText(/Войти/i));

    await screen.findByText(/Invalid credentials/i);

    expect(screen.getByText(/Invalid credentials/i)).toBeInTheDocument();
  });

  test('displays error message when fields are empty on registration', () => {
    render(<AuthUser />);
    fireEvent.click(screen.getByText(/Регистрация/i));
    expect(screen.getByText(/Имя пользователя и пароль обязательны./i)).toBeInTheDocument();
  });

  test('successful registration shows success message', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ success: true }),
      })
    );

    render(<AuthUser />);
    fireEvent.change(screen.getByPlaceholderText(/Имя пользователя/i), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByPlaceholderText(/Пароль/i), { target: { value: 'testpassword' } });

    fireEvent.click(screen.getByText(/Регистрация/i));

    await screen.findByText(/Регистрация прошла успешно/i);

    expect(screen.getByText(/Регистрация прошла успешно/i)).toBeInTheDocument();
  });

  test('displays error message on failed registration', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ success: false, message: 'Registration error' }),
      })
    );

    render(<AuthUser />);
    fireEvent.change(screen.getByPlaceholderText(/Имя пользователя/i), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByPlaceholderText(/Пароль/i), { target: { value: 'testpassword' } });

    fireEvent.click(screen.getByText(/Регистрация/i));

    await screen.findByText(/Registration error/i);

    expect(screen.getByText(/Registration error/i)).toBeInTheDocument();
  });
});