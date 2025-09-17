import { render, screen } from '@testing-library/react';
import App from '../App';

describe('App', () => {
  it('Should render app with default state', () => {
    render(<App />);
    console.log(screen.debug());
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 3 })).toBeInTheDocument();
  });
});
