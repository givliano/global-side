import { render, screen } from '@testing-library/react';
import WeatherComponent from '../WeatherComponent';

describe('Weather Component', () => {
  const mockGeolocation = {
    getCurrentPosition: vi.fn(),
  };

  beforeEach(() => {
    globalThis.fetch = vi.fn();
  });

  it('should render the weather component with no data', () => {
    Object.defineProperty(globalThis.navigator, 'geolocation', {
      value: mockGeolocation,
      writable: true,
    });
    render(<WeatherComponent />);
    expect(screen.getByText(/error loading weather/i));
  });

  it('should render component with data', async () => {
    const mockSuccessfulWeatherResponse = (temp: number, location: string) => {
      return {
        ok: true,
        json: async () => ({
          main: { temp },
          name: location,
        }),
      };
    };

    const mockGeolocationSuccess = {
      getCurrentPosition: vi.fn((success) => {
        success({
          coords: {
            latitude: 41.15333556573153,
            longitude: -8.611692428473255,
          },
        });
      }),
    };

    Object.defineProperty(globalThis.navigator, 'geolocation', {
      value: mockGeolocationSuccess,
      writable: true,
    });

    globalThis.fetch = vi
      .fn()
      .mockResolvedValue(mockSuccessfulWeatherResponse(25, 'Porto'));

    render(<WeatherComponent />);

    expect(await screen.findByText(/Weather in Porto/i)).toBeInTheDocument();
    expect(screen.getByText(/25ºC/i)).toBeInTheDocument();
  });
});
