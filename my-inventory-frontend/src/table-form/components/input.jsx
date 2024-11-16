import React from 'react';
import 'table-form/styles/input.scss';

export const Input = ({...props}) => {
    return <input className='kit-input' {...props} />;
};