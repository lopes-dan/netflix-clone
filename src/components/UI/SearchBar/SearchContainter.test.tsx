import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import SearchContainer from './SearchContainer';

it("renders searchbar", () => {
    render(<MemoryRouter><SearchContainer /></MemoryRouter>)
    const searchContainer = screen.getByTestId('search-container');
    expect(searchContainer).toBeInTheDocument()
})

it("renders and unmounts search input on clicks", () => {
    render(<MemoryRouter><SearchContainer /></MemoryRouter>)
    const searchContainer = screen.getByTestId('search-container');
    const btnEl = screen.getByTestId("buttonIconRight");
    const searchEl = screen.queryByTestId('search-input');
  
    expect(searchContainer).toBeInTheDocument()
    expect(searchEl).not.toBeInTheDocument()

    fireEvent.click(btnEl);
    expect(searchContainer).not.toBeInTheDocument()
    const btnElBack = screen.queryByTestId<HTMLElement>("search-back" )!
    fireEvent.click(btnElBack);
})