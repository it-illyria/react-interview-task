import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from 'table-form/components/button';
import '@testing-library/jest-dom';

// Test suite for the Button component
describe('Button Component', () => {

    it('should handle click events', () => {
        const handleClick = jest.fn();  // Mock function to simulate a click handler

        // Render the button with the onClick handler
        render(<Button onClick={handleClick}>Click Me</Button>);

        // Simulate a click event
        fireEvent.click(screen.getByText('Click Me'));

        // Assert that the onClick function was called
        expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('should render with a cancel variant when specified', () => {
        render(<Button variant="cancel">Cancel</Button>);
    });
});
