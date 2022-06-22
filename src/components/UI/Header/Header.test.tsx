import NavLinks from './NavLinks';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

it('renders links with texts correctly', () => {
    render(<MemoryRouter><NavLinks /></MemoryRouter>)
    const homeLink = screen.getByTestId('home');
    const moviesLink = screen.getByTestId('movies');
    const showsLink = screen.getByTestId('shows');
    const ulEl = screen.getByRole('list');
    const liEl = screen.getAllByRole('listitem')

    expect(ulEl).toHaveClass('list-view')
    expect(liEl[0]).toHaveClass('list-item')
    expect(liEl[1]).toHaveClass('list-item')
    expect(homeLink).toContainHTML('img')
    expect(homeLink).toHaveClass('icon-logo')
    expect(moviesLink).toHaveTextContent('Movies')
    expect(showsLink).toHaveTextContent('TV Shows')
})