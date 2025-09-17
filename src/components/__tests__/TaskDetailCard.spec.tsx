import userEvent from '@testing-library/user-event';
import { render, screen, fireEvent } from '@testing-library/react';

import mockData from '../../data/data.json';
import TaskDetailCard from '../TaskDetailCard';

const defaultProps = {
  task: mockData[0],
  state: {
    tasks: mockData,
    loading: false,
    error: false,
  },
  dispatch: vi.fn(),
  setSelectedTask: vi.fn(),
};

describe('TaskDetailCard Information', () => {
  it('Should render task information correctly', () => {
    const { name, contractNumber, sex, ocrBirthdate, telephone, address } =
      mockData[0];
    render(<TaskDetailCard {...defaultProps} />);

    expect(screen.getByText(name)).toBeInTheDocument();
    expect(screen.getByText(contractNumber)).toBeInTheDocument();
    expect(screen.getByText(sex)).toBeInTheDocument();
    expect(screen.getByLabelText(/birthday/i)).toHaveValue(ocrBirthdate);
    expect(screen.getByText(telephone)).toBeInTheDocument();
    expect(screen.getByText(address)).toBeInTheDocument();
  });

  it('renders all action buttons', () => {
    render(<TaskDetailCard {...defaultProps} />);

    expect(
      screen.getByRole('button', { name: /escalate/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /mark done/i })
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /skip/i })).toBeInTheDocument();
  });
});

describe('TaskDetailCard Button States', () => {
  it('should disable escalate button when task is escalated', () => {
    const escalatedTask = { ...mockData[0], status: 'escalated' };
    render(<TaskDetailCard {...defaultProps} task={escalatedTask} />);
    const button = screen.getByRole('button', { name: /escalate/i });
    expect(button).toBeDisabled();
  });

  it('should disable mark done button when task is escalated', () => {
    const escalatedTask = { ...mockData[0], status: 'completed' };
    render(<TaskDetailCard {...defaultProps} task={escalatedTask} />);
    const button = screen.getByRole('button', { name: /mark done/i });
    expect(button).toBeDisabled();
  });

  it('should disable escalate button when task is escalated', () => {
    const escalatedTask = { ...mockData[0], status: 'skipped' };
    render(<TaskDetailCard {...defaultProps} task={escalatedTask} />);
    const button = screen.getByRole('button', { name: /skip/i });
    expect(button).toBeDisabled();
  });
});

describe('TaskDetailCard User Interactions', () => {
  it('should dispatch ESCALATE_TASK and navigate to next task', async () => {
    const user = userEvent.setup();
    render(<TaskDetailCard {...defaultProps} />);

    const button = screen.getByRole('button', { name: /escalate/i });
    await user.click(button);

    expect(defaultProps.dispatch).toHaveBeenCalledWith({
      type: 'ESCALATE_TASK',
      payload: mockData[0].contractNumber,
    });

    expect(defaultProps.setSelectedTask).toHaveBeenCalledWith(mockData[1]);
  });

  it('should dispatch COMPLETE_TASK and navigate to next task', async () => {
    const user = userEvent.setup();
    render(<TaskDetailCard {...defaultProps} />);

    const button = screen.getByRole('button', { name: /mark done/i });
    await user.click(button);

    expect(defaultProps.dispatch).toHaveBeenCalledWith({
      type: 'COMPLETE_TASK',
      payload: mockData[0].contractNumber,
    });

    expect(defaultProps.setSelectedTask).toHaveBeenCalledWith(mockData[1]);
  });

  it('should dispatch ESCALATE_TASK and navigate to next task', async () => {
    const user = userEvent.setup();
    render(<TaskDetailCard {...defaultProps} />);

    const button = screen.getByRole('button', { name: /skip/i });
    await user.click(button);

    expect(defaultProps.dispatch).toHaveBeenCalledWith({
      type: 'SKIP_TASK',
      payload: mockData[0].contractNumber,
    });

    expect(defaultProps.setSelectedTask).toHaveBeenCalledWith(mockData[1]);
  });

  it('should dispatch CHANGE_BIRTHDAY when input is changed', () => {
    render(<TaskDetailCard {...defaultProps} />);

    const input = screen.getByLabelText(/birthday/i);
    const birthdayDate = '2000-01-01';
    
    fireEvent.change(input, { target: { value: birthdayDate } });

    expect(defaultProps.dispatch).toHaveBeenCalledWith({
      type: 'CHANGE_BIRTHDAY',
      payload: {
        contractNumber: mockData[0].contractNumber,
        birthday: birthdayDate,
      },
    });
  });
});
