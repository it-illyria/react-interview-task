import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { CategoryList } from 'views/components/category-list';
import useGetJobSiteById from 'hooks/job-id';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

// Mock dependencies
jest.mock('hooks/job-id', () => ({
    __esModule: true,
    default: jest.fn(),
}));

jest.mock('table-form/components/search', () => ({
    SearchInput: ({ value, onChange }) => (
        <input
            placeholder="Search"
            value={value}
            onChange={onChange}
            data-testid="search-input"
        />
    ),
}));

jest.mock('table-form/errors/service-error', () => ({
    ServiceError: ({ title }) => <div data-testid="service-error">{title}</div>,
}));

jest.mock('table-form/components/modal', () => ({
    Modal: ({ handleClose, title, body }) => (
        <div data-testid="modal">
            <h2>{title}</h2>
            <button onClick={handleClose}>Close</button>
            {body()}
        </div>
    ),
}));

jest.mock('table-form/components/item-form', () => ({
    __esModule: true,
    default: ({ onClose }) => (
        <div data-testid="item-form">
            <button onClick={onClose}>Submit</button>
        </div>
    ),
}));

// Mock job site data
const mockJobSite = {
    categories: [
        {
            id: 1,
            name: 'Electronics',
            items: [
                { id: 101, item: 'Laptop', quantity: 10, description: 'Gaming laptop', notes: 'Handle with care' },
                { id: 102, item: 'Mouse', quantity: 50, description: 'Wireless mouse', notes: 'New stock' },
            ],
        },
    ],
};

describe('CategoryList Component', () => {
    beforeEach(() => {
        useGetJobSiteById.mockReturnValue({
            jobSite: mockJobSite,
        });
    });

    test('renders category title and items', () => {
        render(
            <MemoryRouter initialEntries={['/categories/Electronics']}>
                <Routes>
                    <Route path="/categories/:category" element={<CategoryList />} />
                </Routes>
            </MemoryRouter>
        );

        // Check category title
        expect(screen.getByText('Electronics')).toBeInTheDocument();

        // Check table headers
        expect(screen.getByText('Nr.')).toBeInTheDocument();
        expect(screen.getByText('Item')).toBeInTheDocument();
        expect(screen.getByText('Quantity')).toBeInTheDocument();
        expect(screen.getByText('Description')).toBeInTheDocument();
        expect(screen.getByText('Notes')).toBeInTheDocument();

        // Check items in the table
        expect(screen.getByText('Laptop')).toBeInTheDocument();
        expect(screen.getByText('Gaming laptop')).toBeInTheDocument();
        expect(screen.getByText('Mouse')).toBeInTheDocument();
        expect(screen.getByText('Wireless mouse')).toBeInTheDocument();
    });

    test('filters items based on search', () => {
        render(
            <MemoryRouter initialEntries={['/categories/Electronics']}>
                <Routes>
                    <Route path="/categories/:category" element={<CategoryList />} />
                </Routes>
            </MemoryRouter>
        );

        // Type into search input
        const searchInput = screen.getByTestId('search-input');
        fireEvent.change(searchInput, { target: { value: 'Laptop' } });

        // Verify filtered results
        expect(screen.getByText('Laptop')).toBeInTheDocument();
        expect(screen.queryByText('Mouse')).not.toBeInTheDocument();
    });

    test('shows ServiceError if no items are found', () => {
        render(
            <MemoryRouter initialEntries={['/categories/Electronics']}>
                <Routes>
                    <Route path="/categories/:category" element={<CategoryList />} />
                </Routes>
            </MemoryRouter>
        );

        // Type a search that doesn't match any items
        const searchInput = screen.getByTestId('search-input');
        fireEvent.change(searchInput, { target: { value: 'NonExistentItem' } });

        // Verify ServiceError is displayed
        expect(screen.getByTestId('service-error')).toBeInTheDocument();
        expect(screen.getByText('No item Found')).toBeInTheDocument();
    });

    test('opens and closes modal on double-click', async () => {
        render(
            <MemoryRouter initialEntries={['/categories/Electronics']}>
                <Routes>
                    <Route path="/categories/:category" element={<CategoryList />} />
                </Routes>
            </MemoryRouter>
        );

        // Double-click on an item row
        const itemRow = screen.getByText('Laptop').closest('tr');
        fireEvent.doubleClick(itemRow);

        // Verify modal is displayed
        const modal = await screen.findByTestId('modal');
        expect(modal).toBeInTheDocument();
        expect(screen.getByText('Edit Item')).toBeInTheDocument();

        // Close modal
        const closeButton = screen.getByText('Close');
        fireEvent.click(closeButton);
        await waitFor(() => expect(modal).not.toBeInTheDocument());
    });
});
