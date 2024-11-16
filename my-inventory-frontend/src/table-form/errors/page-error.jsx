import {Button} from 'table-form/components/button';
import {BackSpaceIcon} from 'styles/go-back';
import 'table-form/styles/page-error.scss';
import {useNavigate} from 'react-router-dom';
import {routerPaths} from 'cons/cons';
import React from "react";

export const ErrorPage = () => {
    const navigate = useNavigate();
    return (
        <section className='not-found'>
            <div className='not-found__box'>
                <h1>404</h1>
                <div className='not-found__box--content'>
                    <h2>Error 404 | Page not found</h2>
                    <p>Oops! The page your looking for doesnt exist </p>{' '}
                </div>
                <Button variant='secondary' onClick={() => navigate(routerPaths.default)}>
                    <BackSpaceIcon/>
                    <span style={{background: '#0F5C97', width: '1.34px', height: '21.97px',}}></span>
                    BACK TO HOME
                </Button>
            </div>
        </section>
    );
};