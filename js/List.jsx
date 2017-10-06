import React from 'react';
import Detail from './Detail';
import Cities from './Cities';

const List = props => {
    const markers = props.markers || [];
    const cities = props.cities || [];
    let venue;
    let cityList;


    if(props.city.name === ''){
      cityList = cities.map((city, i) => {
        return <Cities key={city.id} onChooseCity={props.onChooseCity} {...city}/>
      })
    }else{
      if (markers.length > 0) {
        venue = markers.map((venue, i) => {
          return <Detail onClickDetail={props.onClickDetail} key={venue.id} {...venue} />;
        });
      } else {
        venue = <div className={'row'} style={{marginTop: '40px'}}>No Results</div>;
      }
    }

    return (
        <div className="list container">
            {cityList}
            {props.city.name && <div>
                <div className={'row'}>
                  <p onClick={props.onClickReset} className={'reset-location'}>Choose a new location</p>
                </div>
                {venue}
            </div> }
        </div>
    );
};

export default List;
