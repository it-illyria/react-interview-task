import axios from 'axios';

const API_URL = 'http://localhost:5000/jobSites';

export const getJobSites = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error('Error fetching job sites:', error);
    }
};
///////////////////////////////
export const getJobSiteById = async id => {
    try {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching single job site:', error);
    }
};

//////////////
export const createJobSite = async newJobSite => {
    try {
        const response = await axios.post(API_URL, newJobSite);
        return response.data;
    } catch (error) {
        console.error('Error creating job site:', error);
        throw error;
    }
};

/////////////////////////////
export const createItem = async (jobSiteId, categoryId, newItem) => {
    try {
        const response = await getJobSiteById(jobSiteId);

        if (!response || !response.categories) {
            throw new Error('Job site or categories not found');
        }

        const updatedCategories = response.categories.map(category => {
            if (category.id === categoryId) {
                return {
                    ...category,
                    items: [...category.items, newItem],
                };
            }
            return category;
        });

        const updatedJobSite = {
            ...response,
            categories: updatedCategories,
        };

        await axios.put(`${API_URL}/${jobSiteId}`, updatedJobSite);

        console.log('Item added successfully');
    } catch (error) {
        console.error('Error adding item:', error.message);
    }
};
/////////////////////
export const deleteJobSiteById = async id => {
    try {
        const response = await axios.delete(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error('There was an error deleting the job site!', error);
        throw error;
    }
};

/////
export const updateJobSite = async (id, updateJob) => {
    const response = await axios.put(`${API_URL}/${id}`, updateJob);
    return response.data;
};

export const deleteItem = async (jobSiteId, categoryId, itemId) => {
    try {
        const response = await getJobSiteById(jobSiteId);

        if (!response || !response.categories) {
            throw new Error('Job site or categories not found');
        }

        const updatedCategories = response.categories.map(category => {
            if (category.id === categoryId) {
                return {
                    ...category,
                    items: category.items.filter(item => item.id !== itemId),
                };
            }
            return category;
        });

        const updatedJobSite = {
            ...response,
            categories: updatedCategories,
        };

        await axios.put(`${API_URL}/${jobSiteId}`, updatedJobSite);

        console.log('Item deleted successfully');
    } catch (error) {
        console.error('Error deleting item:', error.message);
    }
};

export const updateItem = async (jobSiteId, categoryId, updatedItem) => {
    try {
        const response = await getJobSiteById(jobSiteId);

        if (!response || !response.categories) {
            throw new Error('Job site or categories not found');
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