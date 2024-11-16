import axios from 'axios';
import { getJobSites } from './api-service'; // Adjust the import path as needed

describe('getJobSites', () => {
    it('should fetch job sites data successfully', async () => {
        // Mock the axios GET request
        const jobSites = [{ id: 1, name: 'Job Site 1' }];
        axios.get.mockResolvedValueOnce({ data: jobSites }); // Mock successful response

        const result = await getJobSites();

        // Assertions
        expect(result).toEqual(jobSites);  // Check if the result matches the mock data
        expect(axios.get).toHaveBeenCalledWith('http://localhost:5000/jobSites');  // Ensure the correct URL is called
    });

    it('should handle errors when fetching job sites', async () => {
        // Mock axios GET to simulate an error
        axios.get.mockRejectedValueOnce(new Error('Network Error'));

        const result = await getJobSites();

        // Assertions
        expect(result).toBeUndefined();  // In case of an error, the function returns nothing
        expect(axios.get).toHaveBeenCalledWith('http://localhost:5000/jobSites');
    });
});
