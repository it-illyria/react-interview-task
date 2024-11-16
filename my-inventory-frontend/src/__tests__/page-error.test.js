import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import { ErrorPage } from 'table-form/errors/page-error';
import { routerPaths } from 'cons/cons';

// Mock `useNavigate`
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn(),
}));

describe('ErrorPage Component', () => {
    let mockNavigate;

    beforeEach(() => {
        mockNavigate = jest.fn();
        jest.mocked(useNavigate).mockReturnValue(mockNavigate);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('renders the ErrorPage with correct content', () => {
        render(
            <MemoryRouter>
                <ErrorPage />
            </MemoryRouter>
        );

        // Check for 404 header
        expect(screen.getByText('404')).toBeInTheDocument();

        // Check for error message
        expect(screen.getByText('Error 404 | Page not found')).toBeInTheDocument();
        expect(screen.getByText("Oops! The page your looking for doesnt exist")).toBeInTheDocument();

        // Check for "Back to Home" button
        expect(screen.getByText('BACK TO HOME')).toBeInTheDocument();
    });

    test('navigates to home when "Back to Home" button is clicked', async () => {
        render(
            <MemoryRouter>
                <ErrorPage />
            </MemoryRouter>
        );

        // Click the button
        const button = screen.getByText('BACK TO HOME');
        await userEvent.click(button);

        // Verify navigation
        expect(mockNavigate).toHaveBeenCalledWith(routerPaths.default);
    });
});
