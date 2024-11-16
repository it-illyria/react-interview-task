import React, {useState} from 'react';
import {Input} from 'table-form/components/input';
import {CustomDropdown} from 'table-form/components/select';
import {Button} from 'table-form/components/button';
import {Check, X} from '@phosphor-icons/react';
import useCreateJobSite from 'hooks/job';
import {v4 as uuidv4} from 'uuid';
import 'table-form/styles/job-form.scss';

export const JobsiteForm = ({
                                jobSitesState,
                                handleClose,
                                item,
                                handleSetJobsites,
                            }) => {
    const {createJob} = useCreateJobSite();

    const [jobsiteName, setJobsiteName] = useState('');
    const [status, setStatus] = useState('');
    const [category] = useState({});

    const handleSubmit = e => {
        e.preventDefault();
        if (!item && (!status || !category || !jobsiteName)) return;
        const newJobSite = {
            id: item.id || uuidv4(),
            name: item ? item.name : jobsiteName,
            status,
            categories: item
                ? item.categories
                : category.map(cat => ({
                    id: uuidv4(),
                    name: cat.value,
                    items: [],
                })),
        };

        if (item) {
            createJob(newJobSite).then(() => {
                const updatedJobSites = [newJobSite, ...jobSitesState];
                handleSetJobsites(updatedJobSites);
            });
            handleClose();
        }
    };
    return (
        <form className='create-form' onSubmit={handleSubmit}>
            <div className='create-form__box'>
                <div className='create-form__box__field'>
                    <label className='create-form__box--labels'>Name</label>
                    <Input
                        value={item ? item.name : jobsiteName}
                        onChange={e => setJobsiteName(e.target.value)}
                        placeholder={`Type the jobsite's name`}
                    />
                </div>
                <div className='create-form__box__dropdowns'>
                    <div className='create-form__box__dropdowns__category'>
                        <label className='create-form__box--labels'>
                            Category Included
                        </label>
                        <CustomDropdown
                            optionsType='category'
                            isMulti={true}
                        />
                    </div>
                    <div className='create-form__box__dropdowns__status'>
                        <label className='create-form__box--labels'>Status</label>
                        <CustomDropdown
                            onChange={e => setStatus(e.value)}
                            isMulti={false}
                        />
                    </div>
                </div>
            </div>
            <footer className='create-form__footer'>
                <Button variant='cancel' onClick={handleClose}>
                    Cancel Changes
                    <span style={{background: '#f44336', width: '1.34px', height: '21.97px'}}></span>
                    <X size={16} fill='#fff' weight='bold'/>
                </Button>
                <Button type='submit'>
                    Save Changes
                    <span style={{background: '#68C142', width: '1.34px', height: '21.97px'}}></span>
                    <Check weight='bold' fill='#fff' size={16}/>
                </Button>
            </footer>
        </form>
    );
};