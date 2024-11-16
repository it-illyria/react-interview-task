import { render, screen, waitFor } from '@testing-library/react';
import  useJobSites  from 'hooks/job-list';
import {getJobSites} from "../services/api-service";

jest.mock('services/api-service', () => ({
    getJobSites: jest.fn(() => Promise.resolve(['jobSite1', 'jobSite2'])),
}));

const MockJobSitesComponent = () => {
    const { jobSites, loading, error } = useJobSites();

    return (
        <div>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            {jobSites?.length > 0 && (
                <ul>
                    {jobSites.map((jobSite) => (
                        <li key={jobSite}>{jobSite}</li>
                    ))}
                </ul>
            )}
        </div>
    );
};



test('fetches and displays job sites', async () => {
    // Mock the API response
    getJobSites.mockResolvedValueOnce(['jobSite1', 'jobSite2']);
    render(<MockJobSitesComponent />);
    const loadingElement = screen.getByText('Loading...');
    expect(loadingElement).toBeInTheDocument();
    await waitFor(() => {
        const jobSiteElements = screen.getAllByRole('listitem');
        expect(jobSiteElements).toHaveLength(2);
        expect(jobSiteElements[0]).toHaveTextContent('jobSite1');
        expect(jobSiteElements[1]).toHaveTextContent('jobSite2');
    });
});



test('handles errors', async () => {
    jest.mocked(getJobSites).mockRejectedValueOnce(new Error('Failed to fetch'));

    render(<MockJobSitesComponent />);

    await waitFor(() => {
        const errorElement = screen.getByText('Error: Failed to fetch job sites.');
        expect(errorElement).toBeInTheDocument();
    });
});