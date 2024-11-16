import React from 'react';
import NoService from 'styles/img/no-service.png';
import 'table-form/styles/service-error.scss';

export const ServiceError = ({title, description}) => {
    return (
        <div className='no-service'>
            <img className='no-service--icon' src={NoService} alt='No Service'/>
            <div className='no-service__content'>
                <h1 className='no-service__content--title'>{title}</h1>
                <p className='no-service__content--description'>{description}</p>
            </div>
        </div>
    );
};