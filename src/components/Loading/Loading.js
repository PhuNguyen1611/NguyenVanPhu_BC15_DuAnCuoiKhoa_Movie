import React, { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';


export default function Loading() {

    const dispatch = useDispatch()
    const { isLoading } = useSelector(state => state.LoadingReducer)

    return <Fragment>
        {isLoading ? <div className='' style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,1)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 999 }}>
            <div className='text-4xl text-white'>Loading...</div>
        </div> : ''}
    </Fragment>
}
