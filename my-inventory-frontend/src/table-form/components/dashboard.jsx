import {NavLink, Outlet, useNavigate, useParams} from 'react-router-dom';
import 'table-form/styles/dashboard.scss';
import useGetJobSiteById from 'hooks/job-id';
import {Button} from 'table-form/components/button';
import {BackSpaceIcon} from 'styles/go-back';
import React from "react";
import {Check} from "@phosphor-icons/react";

export const InventoryDashboard = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const {jobSite} = useGetJobSiteById(id);
    return (
        <main className='inventory-dashboard'>
            <aside className='inventory-dashboard__left'>
                <div className='inventory-dashboard__left__box'>
                    <h2 className='inventory-dashboard__left__box--title'>
                        {jobSite?.name}
                    </h2>
                    <div className='inventory-dashboard__left__box__list'>
                        {jobSite?.categories?.map(cat => (
                            <NavLink key={cat.name} className='inventory-dashboard__left__box__list--link' to={`/${id}/${cat.name}`}>
                                {cat.name}
                                <Check weight='bold' fill='#fff' size={14}/>
                            </NavLink>
                        ))}
                    </div>
                </div>
                <Button className='inventory-dashboard__left--btn-back' variant='secondary'
                        onClick={() => navigate('/')}>
                    Go Back
                    <span style={{background: '#0F5C97', width: '1.34px', height: '21.97px',}}></span>
                    <BackSpaceIcon/>
                </Button>
            </aside>
            <div className='inventory-dashboard--right'>
            <Outlet/>
            </div>
        </main>
    );
};