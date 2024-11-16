import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { CreateJob } from 'views/components/create-job';
import useJobSites from 'hooks/job-list';

// Mock dependencies
jest.mock('hooks/job-list', () => ({
    __esModule: true,
    default: jest.fn(),
}));

jest.mock('table-form/components/report', () => ({
    StatusCard: ({ children, variant }) => (
        <div data-testid={`status-card-${variant}`}>{children}</div>
    ),
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
    Modal: ({ handleClose, body, title }) => (
        <div data-testid="modal">
            <h2>{title}</h2>
            <button onClick={handleClose}>Close</button>
            {body()}
        </div>
    ),
}));

jest.mock('table-form/components/job-form', () => ({
    JobsiteForm: ({ handleClose }) => (
        <div data-testid="jobsite-form">
            <button onClick={handleClose}>Submit</button>
        </div>
    ),
}));

jest.mock('@phosphor-icons/react', () => ({
    Plus: () => <span data-testid="plus-icon">+</span>,
}));

describe('CreateJob Component', () => {
    const mockJobSites = [
        { id: 1, name: 'Site A', status: 'Completed' },
        { id: 2, name: 'Site B', status: 'In Progress' },
        { id: 3, name: 'Site C', status: 'On Hold' },
    ];

    beforeEach(() => {
        useJobSites.mockReturnValue({ jobSites: mockJobSites });
    });

    test('renders correctly with job sites data', () => {
        render(
            <MemoryRouter>
                <CreateJob />
            </MemoryRouter>
        );

        // Check StatusCard counts
        expect(screen.getByText('1 Completed')).toBeInTheDocument();
        expect(screen.getByText('1 On Hold')).toBeInTheDocument();
        expect(screen.getByText('1 On Progress')).toBeInTheDocument();

        // Check table headers
        expect(screen.getByText('Jobsite Name')).toBeInTheDocument();
        expect(screen.getByText('Status')).toBeInTheDocument();

        // Check job site rows
        expect(screen.getByText('Site A')).toBeInTheDocument();
        expect(screen.getByText('Site B')).toBeInTheDocument();
        expect(screen.getByText('Site C')).toBeInTheDocument();
    });

    test('filters job sites based on search input', () => {
        render(
            <MemoryRouter>
                <CreateJob />
            </MemoryRouter>
        );

        // Type into search input
        const searchInput = screen.getByTestId('search-input');
        fireEvent.change(searchInput, { target: { value: 'Site B' } });

        // Verify filtered results
        expect(screen.getByText('Site B')).toBeInTheDocument();
        expect(screen.queryByText('Site A')).not.toBeInTheDocument();
        expect(screen.queryByText('Site C')).not.toBeInTheDocument();
    });

    test('shows ServiceError when no job sites are found', () => {
        render(
            <MemoryRouter>
                <CreateJob />
            </MemoryRouter>
        );

        // Type a search that doesn't match any job site
        const searchInput = screen.getByTestId('search-input');
        fireEvent.change(searchInput, { target: { value: 'NonExistent' } });

        // Verify ServiceError
        expect(screen.getByTestId('service-error')).toBeInTheDocument();
        expect(screen.getByText('No Jobsite Found')).toBeInTheDocument();
    });

    test('opens and closes modal for creating job site', async () => {
        render(
            <MemoryRouter>
                <CreateJob />
            </MemoryRouter>
        );

        // Click the Create button
        const createButton = screen.getByText('Create');
        fireEvent.click(createButton);

        // Verify modal is displayed
        const modal = await screen.findByTestId('modal');
        expect(modal).toBeInTheDocument();
        expect(screen.getByText('Create Jobsite')).toBeInTheDocument();

        // Close modal
        const closeButton = screen.getByText('Close');
        fireEvent.click(closeButton);
        await waitFor(() => expect(modal).not.toBeInTheDocument());
    });

    test('navigates to job site details on row click', () => {
        const mockNavigate = jest.fn();
        jest.mock('react-router-dom', () => ({
            useNavigate: () => mockNavigate,
        }));

        render(
            <MemoryRouter>
                <CreateJob />
            </MemoryRouter>
        );

        // Click on a job site row
        const jobSiteRow = screen.getByText('Site A');
        fireEvent.click(jobSiteRow);

        // Verify navigation
        expect(mockNavigate).toHaveBeenCalledWith('/1');
    });
});
