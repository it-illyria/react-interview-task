import React, {useEffect, useState} from 'react';
import {StatusCard} from 'table-form/components/report';
import {Button} from 'table-form/components/button';
import {Modal} from 'table-form/components/modal';
import {SearchInput} from 'table-form/components/search';
import {JobsiteForm} from 'table-form/components/job-form';
import {Plus} from '@phosphor-icons/react';
import {useNavigate} from 'react-router-dom';
import {ServiceError} from 'table-form/errors/service-error';
import useJobSites from "hooks/job-list";
import 'views/styles/create-job.scss'

export const CreateJob = () => {
    const {jobSites} = useJobSites();
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [search, setSearch] = useState('');
    const [isCreating, setIsCreating] = useState(true);
    const [jobSitesState, setJobSitesState] = useState([...jobSites].reverse());
    useEffect(() => setJobSitesState([...jobSites].reverse()), [jobSites]);

    const completedCount = jobSitesState.filter(site => site.status === 'Completed').length;
    const onHoldCount = jobSitesState.filter(site => site.status === 'On Hold').length;
    const inProgressCount = jobSitesState.filter(site => site.status === 'In Progress').length;

    function handleClose() {
        setShowModal(false);
    }

    const handleSearchChange = e => {
        setSearch(e.target.value);
    };
    const filteredData = jobSitesState?.filter(row =>
        row.name.toLowerCase().includes(search.toLowerCase())
    );

    const handleCreate = () => {
        setIsCreating(true);
        setShowModal(true);
    };

    return (
        <main className='main-container'>
            <nav className='main-container__navbar'>
                <StatusCard variant='on-road'>{inProgressCount} On Progress</StatusCard>
                <StatusCard>{completedCount} Completed</StatusCard>
                <StatusCard className='on-hold'>{onHoldCount} On Hold</StatusCard>
            </nav>

            <div className='main-container__search-container'>
                <h2 className='main-container__search-container--title'>
                    Add and View JobSites
                </h2>
                <SearchInput value={search} onChange={handleSearchChange}/>
                <Button onClick={handleCreate} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    Create
                    <span style={{background: '#68C142', width: '1.34px', height: '21.97px'}}></span>
                    <Plus size={14} fill="#fff" weight="bold"/>
                </Button>

            </div>
            <div className='main-container__table-container'>
                <table>
                    <thead className='main-container__table-container__header'>
                    <tr>
                        <th>Jobsite Name</th>
                        <th>Status</th>
                    </tr>
                    </thead>
                    <tbody className='main-container__table-container__body'>
                    {filteredData.map((row, index) => (
                        <tr
                            key={index}
                            className={`main-container__table-container__body-row ${row.name ? 'highlight-row' : ''}`}
                            style={{backgroundColor: index % 2 === 0 ? '#F9F9F9' : 'transparent'}}
                        >
                            <td
                                onClick={() => navigate(`/${row.id}`)}
                                className='main-container__table-container__body--name'
                                style={{color: row.name ? '#1264A3' : 'inherit', cursor: 'pointer'}}
                            >
                                {row.name}
                            </td>
                            <td>
                <span
                    className={`main-container__table-container__body--status-label 
                    ${row.status.toLowerCase().replace(' ', '-')}`}
                >
                    {row.status}
                </span>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            {filteredData.length === 0 && <ServiceError title='No Jobsite Found'/>}
            {showModal && (
                <Modal
                    handleClose={handleClose}
                    body={() => (
                        <JobsiteForm
                            handleClose={handleClose}
                            handleSetJobsites={setJobSitesState}
                            jobSitesState={jobSitesState}
                            item={isCreating}
                        />
                    )}
                    title={isCreating ? 'Create Jobsite' : ''}
                />
            )}
        </main>
    );
};