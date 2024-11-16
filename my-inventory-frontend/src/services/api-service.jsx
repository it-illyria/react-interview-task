import axios from 'axios';

const API_URL = 'http://localhost:5000/jobSites';

//----- getJobSite -----//
export const getJobSites = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error('Error fetching job sites:', error);
    }
};
//----- getJobSiteById -----//
export const getJobSiteById = async id => {
    try {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching single job site:', error);
    }
};

//----- createJobSite -----//

export const createJobSite = async newJobSite => {
    try {
        const response = await axios.post(API_URL, newJobSite);
        return response.data;
    } catch (error) {
        console.error('Error creating job site:', error);
        throw error;
    }
};


//----- jobSite -----//

export const updateItem = async (jobSiteId, categoryId, updatedItem) => {
    try {
        const response = await getJobSiteById(jobSiteId);

        if (!response || !response.categories) {
            new Error('Job site or categories not found');
        }

        const updatedCategories = response.categories.map(category => {
            if (category.id === categoryId) {
                const updatedItems = category.items.map(item => {
                    if (item.id === updatedItem.id) {
                        return {
                            ...item,
                            ...updatedItem,
                        };
                    }
                    return item;
                });

                return {
                    ...category,
                    items: updatedItems,
                };
            }
            return category;
        });

        const updatedJobSite = {
            ...response,
            categories: updatedCategories,
        };

        await axios.put(`${API_URL}/${jobSiteId}`, updatedJobSite);

        console.log('Item updated successfully');
    } catch (error) {
        console.error('Error updating item:', error.message);
    }
};