import React, { Component } from 'react';
import { withGoogleMap, GoogleMap, Marker, InfoWindow } from 'react-google-maps';

const Info = (props) => {
    return (
        <div>
            <span>{props.name}</span>
            <span>{props.vicinity}</span>
        </div>
    );
};

class Map extends Component {

    mapLoaded = map => {
        this.props.onMapLoaded(map);
    };

    render() {
        let markers = this.props.markers || [];

        if (markers.length > 0) {
            markers = markers.map((venue, i) => {
                const marker = {
                    position: {
                        lat: venue.geometry.location.lat,
                        lng: venue.geometry.location.lng
                    }
                };
                return (
                    <Marker
                        key={venue.id}
                        {...marker}
                        animation={2}
                        onClick={() => this.props.onClickMarker(venue)}
                        icon={{ url: venue.icon, scaledSize: new google.maps.Size(20, 28) }}
                    >

                        {venue.showInfo &&
                            <InfoWindow
                                onCloseClick={() => this.props.onCloseMarker(venue)}
                                defaultPosition={marker.position}
                                options={{ pixelOffset: new google.maps.Size(0, 0) }}
                            >
                                <Info name={venue.name} vicinity={venue.vicinity} />
                            </InfoWindow>}

                    </Marker>
                );
            });
        }

        return (
            <GoogleMap
                ref={this.mapLoaded}
                onDragEnd={this.props.onMapMoved}
                defaultZoom={this.props.zoom}
                defaultCenter={this.props.center}
                center={this.props.center}
            >
                {markers}
            </GoogleMap>
        );
    }
}

export default withGoogleMap(Map);
