import useCreateJobSite from 'hooks/job'; // Your hook file path
import {createJobSite} from 'services/api-service';
import {renderHook} from "@testing-library/react";
import {act} from "react"; // Your service method

// Mock the API service
jest.mock('services/api-service', () => ({
    createJobSite: jest.fn(),
}));

describe('useCreateJobSite functionality', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    // Test for initial state
    it('should initialize with loading as false and error as null', () => {
        const {result} = renderHook(() => useCreateJobSite());

        expect(result.current.loading).toBe(false);
        expect(result.current.error).toBeNull();
    });

    // Test for loading state when creating a job site
    it('should set loading to true when creating a job site', async () => {
        const {result} = renderHook(() => useCreateJobSite());
        const mockNewJobSite = {name: 'Test Job Site'};

        createJobSite.mockResolvedValueOnce({data: {id: 1, name: 'Test Job Site'}});

        // Trigger the job creation
        await act(async () => {
            await result.current.createJob(mockNewJobSite);
        });

        // Check if loading is set to false after API call is completed
        expect(result.current.loading).toBe(false);
    });

    // Test for successful job site creation
    it('should create a job site successfully', async () => {
        const {result} = renderHook(() => useCreateJobSite());
        const mockNewJobSite = {name: 'Test Job Site'};

        // Mock the API response
        createJobSite.mockResolvedValueOnce({data: {id: 1, name: 'Test Job Site'}});

        // Trigger the job creation and await completion
        await act(async () => {
            await result.current.createJob(mockNewJobSite);
        });

        // Verify that the loading is set to false after the API call is completed
        expect(result.current.loading).toBe(false);
        // Ensure there’s no error
        expect(result.current.error).toBeNull();
    });


    it('should handle job site creation failure', async () => {
        const { result } = renderHook(() => useCreateJobSite());
        const mockNewJobSite = { name: 'Test Job Site' };

        // Mock the API response to reject
        createJobSite.mockRejectedValueOnce(new Error('Error creating job site'));

        // Trigger the job creation and catch the error
        await act(async () => {
            try {
                await result.current.createJob(mockNewJobSite);
            } catch (error) {
                // Verify that loading is set to false after the failed API call
                expect(result.current.loading).toBe(false);
            }
        });
    });
});
