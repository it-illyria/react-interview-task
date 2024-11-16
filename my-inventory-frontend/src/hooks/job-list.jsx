import {useState, useEffect} from 'react';
import {getJobSites} from "services/api-service";

const useJobSites = () => {
    const [jobSites, setJobSites] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchJobSites = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await getJobSites();
                setJobSites(data);
            } catch (err) {
                setError('Failed to fetch job sites.');
            } finally {
                setLoading(false);
            }
        };

        fetchJobSites().then();
    }, []);

    return {jobSites, loading, error};
};

export default useJobSites;