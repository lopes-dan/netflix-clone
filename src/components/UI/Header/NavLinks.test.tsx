import NavLinks from './NavLinks';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';


describe('renders Nav Link successfully', () => {

    it('renders img element with correct data', () => {
        render(<MemoryRouter><NavLinks /></MemoryRouter>)
        const imgEl = screen.getByRole('img');

        expect(imgEl).toHaveAttribute('height');
        expect(imgEl).toHaveAttribute('height', '50');
        expect(imgEl).toHaveAttribute('alt');
        expect(imgEl).toHaveAttribute('alt', 'logo');
        expect(imgEl).toHaveAttribute('width');
        expect(imgEl).toHaveAttribute('width', '92');
        expect(imgEl).toHaveAttribute('src', 'https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg');
        expect(imgEl).toHaveClass('logo')
    })
})