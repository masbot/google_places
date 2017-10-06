import React from 'react';

const Cities = props => {
    return (
        <div onClick={() => props.onChooseCity(props)} className={'city-detail-item'}>
            <h1>{props.name}, <span>{props.state}</span></h1>
        </div>
    );
};

export default Cities;
