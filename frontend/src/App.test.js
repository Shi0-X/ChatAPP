/* eslint-env jest */
import { render, screen } from '@testing-library/react';
import App from './components/App.jsx';

test('renders text from App component', () => {
  render(<App />);
  const heading = screen.getByText(/Hexlet Chat/i);
  expect(heading).toBeInTheDocument();
});
