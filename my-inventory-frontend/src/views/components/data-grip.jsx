import React from 'react';
import {ServiceError} from 'table-form/errors/service-error';
import 'views/styles/data-grip.scss';

export const DataGrip = () => {
    return (
        <div className='no-data'>
            <div className='no-data-header'>
                <h2>Data Grip</h2>
            </div>
            <ServiceError description={'Please select a service on your left to proceed.'} title={'No Service Selected'}/>
        </div>
    );
};