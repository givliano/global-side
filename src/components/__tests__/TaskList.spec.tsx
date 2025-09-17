import { render, screen } from '@testing-library/react';
import TaskList from '../TaskList';
import mockData from '../../data/data.json';

const defaultProps = {
  tasks: mockData,
  selectedTask: mockData[0],
  handleClick: vi.fn(),
};

describe('TaskList', () => {
  it('should render the component', () => {
    render(<TaskList {...defaultProps} />);

    expect(
      screen.getByRole('heading', { level: 3, name: /tasks/i })
    ).toBeInTheDocument();

    expect(
      screen.getAllByText(defaultProps.selectedTask.taskName)[0]
    ).toBeInTheDocument();
  });
});
