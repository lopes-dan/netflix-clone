import { render, screen } from '@testing-library/react';
import App from './App';
import { MemoryRouter } from 'react-router-dom';

it('renders header div successfully on load', () => {
    render(<MemoryRouter><App /></MemoryRouter>)
    const divEl = screen.getByTestId("header-div");
    expect(divEl).toBeInTheDocument()
})