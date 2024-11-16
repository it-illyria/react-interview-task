import { render, screen, waitFor } from '@testing-library/react';
import useGetJobSiteById from 'hooks/job';
import { getJobSiteById } from 'services/api-service';

// Mock the API service
jest.mock('services/api-service', () => ({
    getJobSiteById: jest.fn(),
}));


const MockJobSiteComponent = ({ id }) => {
    const { jobSite, loading, error } = useGetJobSiteById(id);

    return (
        <div>
            {loading && <p>Loading...</p>}  {/* Ensure this is rendered during loading */}
            {error && <p>Error: {error}</p>}
            {jobSite && <div>{jobSite.name}</div>}
        </div>
    );
};



test('fetches and displays job site details', async () => {
    getJobSiteById.mockResolvedValueOnce({ id: 1, name: 'Test Job Site' });
    render(<MockJobSiteComponent id={1} />);

    // Wait for the "Loading..." text to appear
    await waitFor(() => {
        const loadingElement = screen.getByText(/Loading.../i); // Use case-insensitive match
        expect(loadingElement).toBeInTheDocument();
    });

    // Wait for the job site data to be fetched and rendered
    await waitFor(() => {
        // Use a more specific query to find the job site name
        const jobSiteNameElement = screen.getByText('Test Job Site');
        expect(jobSiteNameElement).toBeInTheDocument();
    });
});


test('handles errors when fetching job site details', async () => {
    getJobSiteById.mockRejectedValueOnce(new Error('Failed to fetch job site.'));

    render(<MockJobSiteComponent id={1} />);

    // Wait for the error message to appear
    await waitFor(() => {
        const errorElement = screen.getByText('Error: Failed to fetch job site.');
        expect(errorElement).toBeInTheDocument();
    });
});
