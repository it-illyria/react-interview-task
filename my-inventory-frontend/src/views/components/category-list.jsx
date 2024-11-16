import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import useGetJobSiteById from "hooks/job-id";
import {SearchInput} from "table-form/components/search";
import {ServiceError} from 'table-form/errors/service-error';
import {Modal} from "table-form/components/modal";
import ItemForm from "table-form/components/item-form";
import 'views/styles/category-list.scss';

export const CategoryList = () => {
    const {id, category} = useParams();
    const {jobSite} = useGetJobSiteById(id);
    const [search, setSearch] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [jobsiteState, setJobsiteState] = useState(jobSite);
    const [editItem, setEditItem] = useState(null);

    useEffect(() => {
        setJobsiteState(jobSite);
    }, [jobSite]);

    const selectedCategory = jobsiteState?.categories.filter(
        cat => cat.name === category
    );

    const handleSearchChange = e => {
        setSearch(e.target.value);
    };

    const handleClose = () => {
        setShowModal(false);
    };

    const filteredData = selectedCategory?.[0]
        ? selectedCategory[0].items.filter(
            data =>
                data.item.toLowerCase().includes(search.toLowerCase()) ||
                data.description.toLowerCase().includes(search.toLowerCase()) ||
                data.notes.toLowerCase().includes(search.toLowerCase())
        )
        : null;

    const handleEdit = item => {
        setEditItem(item);
        setShowModal(true);
    };

    return (
        <>
            <div className='table-container'>
                <div className='table-container__header'>
                    <h2 className='table-container__header-title'>{category}</h2>
                    <div className='table-container__header-controls'>
                        <SearchInput value={search} onChange={handleSearchChange}/>
                    </div>
                </div>
                <table className='table-container--table'>
                    <thead className='table-container--table__header'>
                    <tr>
                        <th>Nr.</th>
                        <th>Item</th>
                        <th>Quantity</th>
                        <th>Description</th>
                        <th>Notes</th>
                    </tr>
                    </thead>
                    <tbody className='table-container--table__body'>
                    {filteredData?.map((row, index) => (
                        <tr
                            className='table-container--table__body-row'
                            key={index}
                            style={{backgroundColor: index % 2 !== 0 ? '' : '#F8F8FA'}}
                            onDoubleClick={() => handleEdit(row)}
                        >
                            <td>{index + 1}</td>
                            <td>{row.item}</td>
                            <td>{row.quantity}</td>
                            <td>{row.description}</td>
                            <td>{row.notes}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                {filteredData?.length === 0 && <ServiceError title={'No item Found'}/>}
                {showModal && (
                    <Modal
                        handleClose={handleClose}
                        title="Edit Item"
                        body={() => (
                            <ItemForm
                                onClose={handleClose}
                                jobsite={jobSite}
                                editItem={editItem}
                                categoryId={selectedCategory?.[0].id}
                                handleSetItem={item => {
                                    setJobsiteState(prev => {
                                        const updatedCategories = prev.categories.map(cat => {
                                            if (cat.name === category) {
                                                return {
                                                    ...cat,
                                                    items: cat.items.map(existingItem =>
                                                        existingItem.id === item.id ? item : existingItem
                                                    ),
                                                };
                                            }
                                            return cat;
                                        });
                                        return {...prev, categories: updatedCategories};
                                    });
                                }}
                            />
                        )}
                    />
                )}
            </div>
        </>
    );
};
