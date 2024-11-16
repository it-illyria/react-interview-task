import { render, screen, fireEvent } from '@testing-library/react';
import { Input } from 'table-form/components/Input';  // Adjust the import as needed

test('accepts user input', () => {
    render(<Input />);
    const input = screen.getByRole('textbox'); // Get the input element
    fireEvent.change(input, { target: { value: 'Hello, React!' } }); // Simulate user input
    expect(input).toHaveValue('Hello, React!'); // Assert that the value has changed
});

test('renders with placeholder text', () => {
    const placeholderText = "Enter your name";
    render(<Input placeholder={placeholderText} />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('placeholder', placeholderText);  // Assert that the placeholder is set
});

test('input is disabled when disabled prop is passed', () => {
    render(<Input disabled />);
    const input = screen.getByRole('textbox');
    expect(input).toBeDisabled(); // Check if the input is disabled
});
