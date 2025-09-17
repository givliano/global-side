import { render, screen } from '@testing-library/react';

import Header from '../Header';

describe('Header', () => {
  const mockGeolocation = {
    getCurrentPosition: vi.fn(),
  };

  beforeEach(() => {
    Object.defineProperty(globalThis.navigator, 'geolocation', {
      value: mockGeolocation,
      writable: true,
    });
  });

  it('should render Header component with no task selected', () => {
    render(<Header name={''} />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'Task Management'
    );
  });

  it('should render Header component with task selected', () => {
    render(<Header name={'Foobar'} />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'Foobar'
    );
  });
});
