import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', async () => {
  render(<App />);
  const linkElement = await screen.findByRole('link', { name: /learn react/i });
  expect(linkElement).toBeInTheDocument();
});
