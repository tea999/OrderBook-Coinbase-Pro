import { render, screen } from '@testing-library/react';
import CurrencyDropDown from './CurrencyDropDown';
import '@testing-library/jest-dom'

// you will need to comment out this line - StockPriceSize.jsx:10:15  - to run this test 
test('renders a message', () => {
  render(<CurrencyDropDown />)
  expect(screen.getByText('Select a Currency Pair')).toBeInTheDocument()

})