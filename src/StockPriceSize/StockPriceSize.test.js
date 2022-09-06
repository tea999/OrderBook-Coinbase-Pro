import { render, screen } from '@testing-library/react';
import StockPriceSize from './StockPriceSize';
import '@testing-library/jest-dom'


// you will need to comment out this line - StockPriceSize.jsx:10:15  - then run this test 
test('renders a message', () => {
  render(<StockPriceSize />)
  expect(screen.getByText('Best Bid')).toBeInTheDocument()
})



