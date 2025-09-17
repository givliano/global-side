import { render, screen } from '@testing-library/react';
import TaskDetail from '../TaskDetail';
import mockData from '../../data/data.json';

describe('TaskDetail', () => {
  it('Should render TaskDetail with default props and no task', () => {
    render(
      <TaskDetail
        task={null}
        state={{ tasks: [], loading: false, error: false }}
        dispatch={vi.fn()}
        setSelectedTask={vi.fn()}
      />
    );

    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(
      'No task selected'
    );
  });

  it('Should rendeer TaskDetail with right name', () => {
    render(
      <TaskDetail
        task={mockData[0]}
        state={{ tasks: [], loading: false, error: false }}
        dispatch={vi.fn()}
        setSelectedTask={vi.fn()}
      />
    );

    expect(screen.getByText(mockData[0].name)).toBeInTheDocument();
  });
});
