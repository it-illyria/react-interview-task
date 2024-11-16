import {useState} from 'react';
import {createJobSite} from "services/api-service";

const useCreateJobSite = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const createJob = async newJobSite => {
        setLoading(true);
        setError(null);
        try {
            const response = await createJobSite(newJobSite);
            setLoading(false);
            return response.data;
        } catch (error) {
            setLoading(false);
            setError(error);
            throw error;
        }
    };

    return {createJob, loading, error};
};

export default useCreateJobSite;