import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Modal } from 'table-form/components/modal';

describe('Modal Component', () => {
    const mockHandleClose = jest.fn();

    test('renders modal with default title and body content', () => {
        const bodyContent = jest.fn(() => <div>Modal Body Content</div>); // Mock the body function

        render(
            <Modal body={bodyContent} handleClose={mockHandleClose} />
        );

        // Check if the default title is rendered
        expect(screen.getByText('Title')).toBeInTheDocument();

        // Check if the modal body content is rendered
        expect(screen.getByText('Modal Body Content')).toBeInTheDocument();
    });

    test('renders modal with custom title', () => {
        const bodyContent = jest.fn(() => <div>Custom Modal Body</div>); // Mock the body function

        render(
            <Modal body={bodyContent} title="Custom Title" handleClose={mockHandleClose} />
        );

        // Check if the custom title is rendered
        expect(screen.getByText('Custom Title')).toBeInTheDocument();
    });

    test('calls handleClose when the close icon is clicked', () => {
        const bodyContent = jest.fn(() => <div>Body Content</div>); // Mock the body function

        render(
            <Modal body={bodyContent} handleClose={mockHandleClose} />
        );

        // Click on the close icon
        fireEvent.click(screen.getByRole('button'));

        // Assert that handleClose has been called
        expect(mockHandleClose).toHaveBeenCalledTimes(1);
    });

    test('displays the modal body content passed as a function', () => {
        const bodyContent = jest.fn(() => <div>Test Body</div>);

        render(
            <Modal body={bodyContent} handleClose={mockHandleClose} />
        );

        // Verify if the modal body content is rendered
        expect(screen.getByText('Test Body')).toBeInTheDocument();
    });
});
