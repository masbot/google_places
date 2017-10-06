import React from 'react';
import { render } from 'react-dom';
import GooglePlaces from './GooglePlaces';

const App = () => (
    <div className="app">
        <GooglePlaces />
    </div>
);

render(<App />, document.getElementById('app'));
