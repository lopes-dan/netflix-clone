import Home from './Home';
import Carousel from '../components/Carousel/Carousel';
import { render, screen, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

test('renders home successfully', () => {
    render(<MemoryRouter><Home title="string" /></MemoryRouter>)
    const homeEl = screen.getByTestId('homeWrapper');
    expect(homeEl).toBeInTheDocument()
})

test('renders carousel successfully', async () => {
    const { findByTestId } = render(<MemoryRouter><Carousel /></MemoryRouter>)
    const carouselEl = await findByTestId('carousel');
    expect(carouselEl).toBeInTheDocument()
})