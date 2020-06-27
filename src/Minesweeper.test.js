import React from 'react';
import { render } from '@testing-library/react';
import Minesweeper from './Minesweeper';

test('renders learn react link', () => {
  const { getByText } = render(<Minesweeper />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
