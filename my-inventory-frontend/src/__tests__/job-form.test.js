import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import {JobsiteForm} from 'table-form/components/job-form';
import useCreateJobSite from 'hooks/job';

// Mocking the custom hooks and services
jest.mock('hooks/job', () => ({
    useCreateJobSite: jest.fn(() => ({
        createJob: jest.fn(),
    })),
}));

jest.mock('uuid', () => ({
    v4: jest.fn(() => '1234-uuid'),
}));

describe('JobsiteForm Component', () => {
    const mockHandleClose = jest.fn();
    const mockHandleSetJobsites = jest.fn();
    const jobSitesState = [{ id: 'existing-job-id', name: 'Existing Job', status: 'In Progress', categories: [] }];
    const mockItem = null; // Testing create new jobsite

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders the form and allows user input', () => {
        render(
            <JobsiteForm
                jobSitesState={jobSitesState}
                handleClose={mockHandleClose}
                item={mockItem}
                handleSetJobsites={mockHandleSetJobsites}
            />
        );

        // Check if the form fields are rendered
        expect(screen.getByLabelText("Name")).toBeInTheDocument();
        expect(screen.getByLabelText("Category Included")).toBeInTheDocument();
        expect(screen.getByLabelText("Status")).toBeInTheDocument();
    });

    test('can type into the input fields', () => {
        render(
            <JobsiteForm
                jobSitesState={jobSitesState}
                handleClose={mockHandleClose}
                item={mockItem}
                handleSetJobsites={mockHandleSetJobsites}
            />
        );

        // Simulate typing into the input fields
        fireEvent.change(screen.getByPlaceholderText("Type the jobsite's name"), {
            target: { value: 'New Jobsite' },
        });
        fireEvent.change(screen.getByPlaceholderText("Category Included"), {
            target: { value: 'New Category' },
        });
        fireEvent.change(screen.getByPlaceholderText('Status'), {
            target: { value: 'In Progress' },
        });

        // Assert the values are being updated correctly
        expect(screen.getByPlaceholderText("Type the jobsite's name").value).toBe('New Jobsite');
    });

    test('submit the form creates a new jobsite', async () => {
        render(
            <JobsiteForm
                jobSitesState={jobSitesState}
                handleClose={mockHandleClose}
                item={mockItem}
                handleSetJobsites={mockHandleSetJobsites}
            />
        );

        // Simulate typing into the fields
        fireEvent.change(screen.getByPlaceholderText("Type the jobsite's name"), {
            target: { value: 'New Jobsite' },
        });

        // Simulate selecting category and status
        fireEvent.change(screen.getByLabelText("Category Included"), {
            target: { value: 'Category 1' },
        });
        fireEvent.change(screen.getByLabelText("Status"), {
            target: { value: 'In Progress' },
        });

        // Submit the form
        fireEvent.click(screen.getByText('Save Changes'));

        await waitFor(() => {
            // Assert that the createJob function was called
            expect(useCreateJobSite().createJob).toHaveBeenCalledWith({
                id: '1234-uuid',
                name: 'New Jobsite',
                status: 'In Progress',
                categories: [
                    { id: '1234-uuid', name: 'Category 1', items: [] },
                ],
            });

            // Ensure the jobsite list is updated
            expect(mockHandleSetJobsites).toHaveBeenCalledWith([
                { id: '1234-uuid', name: 'New Jobsite', status: 'In Progress', categories: [{ id: '1234-uuid', name: 'Category 1', items: [] }] },
                ...jobSitesState,
            ]);
            expect(mockHandleClose).toHaveBeenCalled();
        });
    });

    test('submit the form with existing jobsite updates it', async () => {
        const editItem = {
            id: 'existing-job-id',
            name: 'Existing Job',
            status: 'Completed',
            categories: [{ id: '1', name: 'Existing Category', items: [] }],
        };

        render(
            <JobsiteForm
                jobSitesState={jobSitesState}
                handleClose={mockHandleClose}
                item={editItem}
                handleSetJobsites={mockHandleSetJobsites}
            />
        );

        // Simulate editing the jobsite
        fireEvent.change(screen.getByPlaceholderText("Type the jobsite's name"), {
            target: { value: 'Updated Jobsite' },
        });

        // Submit the form
        fireEvent.click(screen.getByText('Save Changes'));

        await waitFor(() => {
            // Check if the createJob was not called since it's an update
            expect(useCreateJobSite().createJob).not.toHaveBeenCalled();

            // Check if the jobsite update was processed correctly
            expect(mockHandleSetJobsites).toHaveBeenCalledWith([
                { id: 'existing-job-id', name: 'Updated Jobsite', status: 'Completed', categories: [{ id: '1', name: 'Existing Category', items: [] }] },
                ...jobSitesState.filter(site => site.id !== 'existing-job-id'),
            ]);
            expect(mockHandleClose).toHaveBeenCalled();
        });
    });

    test('does not submit if required fields are empty', async () => {
        render(
            <JobsiteForm
                jobSitesState={jobSitesState}
                handleClose={mockHandleClose}
                item={mockItem}
                handleSetJobsites={mockHandleSetJobsites}
            />
        );

        // Click the Save Changes button without filling out the form
        fireEvent.click(screen.getByText('Save Changes'));

        // Ensure that the createJob was not called
        expect(useCreateJobSite().createJob).not.toHaveBeenCalled();
        expect(mockHandleSetJobsites).not.toHaveBeenCalled();
    });
});
