import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ItemForm from 'table-form/components/item-form';
import { updateItem } from 'services/api-service';

// Mock the external services
jest.mock('services/api-service', () => ({
    createItem: jest.fn(),
    updateItem: jest.fn(),
}));

jest.mock('uuid', () => ({
    v4: jest.fn(() => '1234-uuid'),
}));

describe('ItemForm Component', () => {
    const mockJobSite = { id: '1' };
    const mockCategoryId = 'category-1';
    const mockHandleSetItem = jest.fn();
    const mockOnClose = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders the form and allows user input', () => {
        render(
            <ItemForm
                jobsite={mockJobSite}
                categoryId={mockCategoryId}
                onClose={mockOnClose}
                handleSetItem={mockHandleSetItem}
                editItem={null}
            />
        );

        // Check if the form fields are rendered
        expect(screen.getByLabelText('Item')).toBeInTheDocument();
        expect(screen.getByLabelText('Quantity')).toBeInTheDocument();
        expect(screen.getByLabelText('Description')).toBeInTheDocument();
        expect(screen.getByLabelText('Notes')).toBeInTheDocument();
    });

    test('can type into the input fields', () => {
        render(
            <ItemForm
                jobsite={mockJobSite}
                categoryId={mockCategoryId}
                onClose={mockOnClose}
                handleSetItem={mockHandleSetItem}
                editItem={null}
            />
        );

        // Simulate user typing into the fields
        fireEvent.change(screen.getByPlaceholderText('Type item name...'), {
            target: { value: 'Test Item' },
        });
        fireEvent.change(screen.getByPlaceholderText('Set Quantity'), {
            target: { value: '10' },
        });
        fireEvent.change(screen.getByPlaceholderText('Type the description...'), {
            target: { value: 'Test Description' },
        });
        fireEvent.change(screen.getByPlaceholderText(' Type a note...'), {
            target: { value: 'Test Notes' },
        });

        // Assert that the input values are updated
        expect(screen.getByPlaceholderText('Type item name...').value).toBe('Test Item');
        expect(screen.getByPlaceholderText('Set Quantity').value).toBe('10');
        expect(screen.getByPlaceholderText('Type the description...').value).toBe('Test Description');
        expect(screen.getByPlaceholderText(' Type a note...').value).toBe('Test Notes');
    });

    test('submits the form and calls the appropriate service method (createItem)', async () => {
        render(
            <ItemForm
                jobsite={mockJobSite}
                categoryId={mockCategoryId}
                onClose={mockOnClose}
                handleSetItem={mockHandleSetItem}
                editItem={null}
            />
        );

        // Fill out the form
        fireEvent.change(screen.getByPlaceholderText('Type item name...'), {
            target: { value: 'Test Item' },
        });
        fireEvent.change(screen.getByPlaceholderText('Set Quantity'), {
            target: { value: '10' },
        });
        fireEvent.change(screen.getByPlaceholderText('Type the description...'), {
            target: { value: 'Test Description' },
        });
        fireEvent.change(screen.getByPlaceholderText(' Type a note...'), {
            target: { value: 'Test Notes' },
        });

        // Submit the form
        fireEvent.click(screen.getByText('Save Changes'));

        await waitFor(() => {
            // Check if createItem has been called with the correct parameters
            expect(createItem).toHaveBeenCalledWith(
                mockJobSite.id,
                mockCategoryId,
                {
                    id: '1234-uuid',
                    item: 'Test Item',
                    quantity: '10',
                    description: 'Test Description',
                    notes: 'Test Notes',
                }
            );
            expect(mockHandleSetItem).toHaveBeenCalledWith({
                id: '1234-uuid',
                item: 'Test Item',
                quantity: '10',
                description: 'Test Description',
                notes: 'Test Notes',
            });
            expect(mockOnClose).toHaveBeenCalled();
        });
    });

    test('submits the form and calls the appropriate service method (updateItem)', async () => {
        const editItem = {
            id: '1',
            item: 'Old Item',
            quantity: '5',
            description: 'Old Description',
            notes: 'Old Notes',
        };

        render(
            <ItemForm
                jobsite={mockJobSite}
                categoryId={mockCategoryId}
                onClose={mockOnClose}
                handleSetItem={mockHandleSetItem}
                editItem={editItem}
            />
        );

        // Change values in the form
        fireEvent.change(screen.getByPlaceholderText('Type item name...'), {
            target: { value: 'Updated Item' },
        });
        fireEvent.change(screen.getByPlaceholderText('Set Quantity'), {
            target: { value: '20' },
        });
        fireEvent.change(screen.getByPlaceholderText('Type the description...'), {
            target: { value: 'Updated Description' },
        });
        fireEvent.change(screen.getByPlaceholderText(' Type a note...'), {
            target: { value: 'Updated Notes' },
        });

        // Submit the form
        fireEvent.click(screen.getByText('Save Changes'));

        await waitFor(() => {
            // Check if updateItem has been called with the correct parameters
            expect(updateItem).toHaveBeenCalledWith(
                mockJobSite.id,
                mockCategoryId,
                {
                    id: '1',
                    item: 'Updated Item',
                    quantity: '20',
                    description: 'Updated Description',
                    notes: 'Updated Notes',
                }
            );
            expect(mockHandleSetItem).toHaveBeenCalledWith({
                id: '1',
                item: 'Updated Item',
                quantity: '20',
                description: 'Updated Description',
                notes: 'Updated Notes',
            });
            expect(mockOnClose).toHaveBeenCalled();
        });
    });

    test('does not submit if required fields are empty', async () => {
        render(
            <ItemForm
                jobsite={mockJobSite}
                categoryId={mockCategoryId}
                onClose={mockOnClose}
                handleSetItem={mockHandleSetItem}
                editItem={null}
            />
        );

        // Click the Save Changes button without filling out the form
        fireEvent.click(screen.getByText('Save Changes'));

        // Ensure that the createItem or updateItem was not called
        expect(createItem).not.toHaveBeenCalled();
        expect(updateItem).not.toHaveBeenCalled();
    });
});
