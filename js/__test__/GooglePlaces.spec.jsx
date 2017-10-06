import React from 'react';
import { shallow } from 'enzyme';
import GooglePlaces from '../GooglePlaces';

test('Search renders correctly', () => {
    const component = shallow(<GooglePlaces />);
    expect(component).toMatchSnapshot();
});
