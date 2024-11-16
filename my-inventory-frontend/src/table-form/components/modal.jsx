import React from 'react';
import {X} from '@phosphor-icons/react';
import 'table-form/styles/modal.scss';

export const Modal = ({body, title = 'Title', handleClose}) => {
    return (
        <div className='modal'>
            <div className='modal-container'>
                <div className='modal-container-header'>
                    <h2>{title}</h2>
                    <X
                        className='modal-container-header--cancel'
                        size={20}
                        weight='bold'
                        onClick={handleClose}
                    />
                </div>
                <div className='modal-container-body'>{body()}</div>
            </div>
        </div>
    );
};