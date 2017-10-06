import React from 'react';

const Detail = props => {
    let pictureUrl;
    let open_now;

    if (typeof props.photos !== 'undefined') {
        pictureUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${props.photos[0].photo_reference}&key=AIzaSyAB9Og-vXpoXkt8P9S_ZSWpFeRHMKHF74k`;
    }

    if (typeof props.opening_hours !== 'undefined') {
        open_now = props.opening_hours.open_now;
    } else {
        open_now = false;
    }

    return (
        <div
            onClick={() => props.onClickDetail(props)}
            id={props.id}
            className={'row detail-item'}
            style={{
                border: '1px solid gray',
                height: '200px',
                marginBottom: '15px',
                marginTop: '15px',
                overflow: 'hidden'
            }}
        >
            <div className="col-md-4" style={{ paddingLeft: '0' }}>
                <img style={{ width: '100%' }} src={pictureUrl} alt="" />
            </div>
            <div className="col-md-8">
                <p className={`${props.showInfo == true ? 'red' : ''} name`}>{props.name}</p>
                <p className={'open-now'}>Open Now: <span>{open_now ? 'Yes' : 'No'}</span></p>
                <p className={'address'}>Address: <span>{props.vicinity}</span></p>
                <p className={'rating'}>Rating: <span>{props.rating}</span></p>
            </div>
        </div>
    );
};

export default Detail;
