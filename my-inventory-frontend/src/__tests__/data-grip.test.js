import { render, screen } from '@testing-library/react';
import { DataGrip } from 'views/components/data-grip';

test('renders DataGrip component with ServiceError', () => {
    render(<DataGrip />);

    // Check for the header
    const headerElement = screen.getByText('Data Grip');
    expect(headerElement).toBeInTheDocument();

    // Verify the presence of ServiceError by its content
    const titleElement = screen.getByText('No Service Selected');
    const descriptionElement = screen.getByText('Please select a service on your left to proceed.');

    expect(titleElement).toBeInTheDocument();
    expect(descriptionElement).toBeInTheDocument();
});
