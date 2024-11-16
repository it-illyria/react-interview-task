import React from 'react';
import {render, screen, fireEvent} from '@testing-library/react';
import {Textarea} from 'table-form/components/comment';
import '@testing-library/jest-dom/extend-expect';

test('applies custom class names', () => {
    const customClass = 'my-custom-class';
    render(<Textarea className={customClass}/>);
    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveClass(customClass);  // Check if the custom class is applied
});

test('textarea is disabled when disabled prop is passed', () => {
    render(<Textarea disabled/>);
    const textarea = screen.getByRole('textbox');
    expect(textarea).toBeDisabled(); // Check if textarea is disabled
});

test('renders with placeholder text', () => {
    const placeholderText = "Enter your comment here";
    render(<Textarea placeholder={placeholderText}/>);
    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveAttribute('placeholder', placeholderText);  // Assert that the placeholder is set
});

test('accepts user input', () => {
    render(<Textarea/>);
    const textarea = screen.getByRole('textbox'); // Get the textarea element
    fireEvent.change(textarea, {target: {value: 'Hello, World!'}}); // Simulate user input
    expect(textarea).toHaveValue('Hello, World!'); // Assert that the value has changed
});
