import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { InventoryDashboard } from 'table-form/components/dashboard';
import useGetJobSiteById from 'hooks/job-id';

// Mock dependencies
jest.mock('hooks/job-id', () => ({
    __esModule: true,
    default: jest.fn(),
}));

jest.mock('table-form/components/button', () => ({
    Button: ({ children, onClick, className }) => (
        <button className={className} onClick={onClick} data-testid="custom-button">
            {children}
        </button>
    ),
}));

jest.mock('@phosphor-icons/react', () => ({
    Check: () => <span data-testid="check-icon">✔</span>,
    BackSpaceIcon: () => <span data-testid="back-icon">🔙</span>,
}));

describe('InventoryDashboard Component', () => {
    const mockJobSite = {
        id: '1',
        name: 'Test JobSite',
        categories: [
            { name: 'Category A' },
            { name: 'Category B' },
            { name: 'Category C' },
        ],
    };

    beforeEach(() => {
        useGetJobSiteById.mockReturnValue({ jobSite: mockJobSite });
    });

    test('renders job site name and categories', () => {
        render(
            <MemoryRouter>
                <InventoryDashboard />
            </MemoryRouter>
        );

        // Check job site name
        expect(screen.getByText('Test JobSite')).toBeInTheDocument();

        // Check categories
        expect(screen.getByText('Category A')).toBeInTheDocument();
        expect(screen.getByText('Category B')).toBeInTheDocument();
        expect(screen.getByText('Category C')).toBeInTheDocument();

        // Check Check icons
        const checkIcons = screen.getAllByTestId('check-icon');
        expect(checkIcons.length).toBe(3);
    });

    test('renders "Go Back" button and navigates correctly', () => {
        const mockNavigate = jest.fn();
        jest.mock('react-router-dom', () => ({
            ...jest.requireActual('react-router-dom'),
            useNavigate: () => mockNavigate,
        }));

        render(
            <MemoryRouter>
                <InventoryDashboard />
            </MemoryRouter>
        );

        // Click the "Go Back" button
        const backButton = screen.getByTestId('custom-button');
        fireEvent.click(backButton);

        // Verify navigation
        expect(mockNavigate).toHaveBeenCalledWith('/');
    });

    test('renders NavLink for each category with correct paths', () => {
        render(
            <MemoryRouter>
                <InventoryDashboard />
            </MemoryRouter>
        );

        // Check NavLink paths
        const categoryLinks = screen.getAllByRole('link');
        expect(categoryLinks[0].getAttribute('href')).toBe('/1/Category A');
        expect(categoryLinks[1].getAttribute('href')).toBe('/1/Category B');
        expect(categoryLinks[2].getAttribute('href')).toBe('/1/Category C');
    });

    test('renders Outlet for nested routes', () => {
        render(
            <MemoryRouter initialEntries={['/1']}>
                <Routes>
                    <Route path="/:id" element={<InventoryDashboard />}>
                        <Route
                            path=":category"
                            element={<div data-testid="nested-route-content">Nested Content</div>}
                        />
                    </Route>
                </Routes>
            </MemoryRouter>
        );

        // Check that Outlet placeholder is present initially
        expect(screen.queryByTestId('nested-route-content')).not.toBeInTheDocument();

        // Navigate to a nested route
        const categoryLink = screen.getByText('Category A');
        fireEvent.click(categoryLink);

        // Verify nested route content
        expect(screen.getByTestId('nested-route-content')).toBeInTheDocument();
    });
});
