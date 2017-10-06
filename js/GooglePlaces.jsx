import React, { Component } from 'react';
import axios from 'axios';
import Map from './Map';
import Search from './Search';
import List from './List';
import Spinner from './Spinner';
import preload from '../cities.json';

class GooglePlaces extends Component {
    state = {
        markers: [],
        searchTerm: '',
        map: null,
        zoom: 15,
        loading: false,
        city: { name: '', location: { lat: 0, lng: 0 } },
    };

    onSearchTermChange = event => {
        this.setState({ searchTerm: event.target.value });
    };

    onEnter = event => {
        if (event.key === 'Enter') {
            this.fetchMarker();
        }
    };

    onMapLoaded = map => {
        if (this.state.map != null) {
            return;
        }

        this.setState({
            map: map
        });
    };

    onMapMoved = () => {
        let location = JSON.stringify(this.state.map.getCenter());
        const lat = location.lat;
        const lng = location.lng;
        this.setState({city: {name: this.state.city.name, location: { lat: lat, lng: lng }}})

        if (this.state.searchTerm.length > 0) {
            this.fetchMarker();
        }
    };

    onClickDetail = targetMarker => {
        this.onClickMarker(targetMarker);
    };

    onClickMarker = targetMarker => {
        location.hash = '#' + targetMarker.id;
        this.setState({
            markers: this.state.markers.map(marker => {
                if (marker.id === targetMarker.id) {
                    marker.showInfo = true;
                } else {
                    marker.showInfo = false;
                }
                return marker;
            })
        });
    };

    onCloseMarker = targetMarker => {
        this.setState({
            markers: this.state.markers.map(marker => {
                if (marker.id === targetMarker.id) marker.showInfo = false;
                return marker;
            })
        });
    };

    onChooseCity = targetCity => {
        this.setState({ city: targetCity });
    };

    onClickReset = () => {
        console.log('reset')
        this.setState({ city: { name: '', location: { lat: 0, lng: 0 } }, searchTerm: '', markers: []});
    };

    fetchMarker = () => {
      this.setState({ loading: true });
      let location = JSON.stringify(this.state.map.getCenter());
      location = JSON.parse(location);
      const lat = location.lat;
      const lng = location.lng;
      const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=500&&keyword=${this.state.searchTerm}&key=AIzaSyAB9Og-vXpoXkt8P9S_ZSWpFeRHMKHF74k`;
      console.log(url);
      axios({
        method: 'GET',
        url: url,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
          'Access-Control-Allow-Methods': 'GET',
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then(response => {
        console.log(response)
        this.setState({ markers: response.data.results, loading: false });
      });
    };

    render() {
        return (
            <div className="container-fluid">
                <Search
                    onEnter={this.onEnter}
                    onSearchTermChange={this.onSearchTermChange}
                    searchTerm={this.state.searchTerm}
                    city={this.state.city}
                />
                <div className="row">
                    <div className="col-md-4" style={{ width: '100%', height: '900px' }}>
                        <Map
                            map={this.state.map}
                            zoom={this.state.zoom}
                            markers={this.state.markers}
                            center={{ lat: this.state.city.location.lat, lng: this.state.city.location.lng }}
                            containerElement={<div style={{ height: '100%' }} />}
                            mapElement={<div style={{ height: '100%' }} />}
                            onMapLoaded={this.onMapLoaded}
                            onMapMoved={this.onMapMoved}
                            onClickMarker={this.onClickMarker}
                            onCloseMarker={this.onCloseMarker}
                        />
                    </div>
                    <div className="col-md-8" style={{ width: '100%', height: '900px', overflowX: 'scroll' }}>
                        {this.state.loading && <Spinner />}
                        <List
                            markers={this.state.markers}
                            onClickReset={this.onClickReset}
                            onChooseCity={this.onChooseCity}
                            onClickDetail={this.onClickDetail}
                            cities={preload.cities}
                            city={this.state.city}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default GooglePlaces;
