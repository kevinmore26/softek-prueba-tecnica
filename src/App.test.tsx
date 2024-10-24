import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders without crashing', () => {
  render(<App />);
  // Busca un texto real que esté presente en tu aplicación
  expect(screen.getByText('Cotiza aquí')).toBeInTheDocument(); // Ajusta según el texto que tengas en la página inicial
});
