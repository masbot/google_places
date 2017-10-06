import React from 'react';
import { shallow } from 'enzyme';
import List from '../List';
import Detail from '../Detail';
import Cities from '../Cities';
import preload from '../../data.json';
import citesData from '../../cities.json';

console.log(citesData.cities.length);

test('Search renders correctly', () => {
    const component = shallow(<List city="" />);
    expect(component).toMatchSnapshot();
});

test('Search should render correct amount of results', () => {
    const component = shallow(<List city={{ name: 'test' }} markers={preload.results} />);
    expect(component.find(Detail).length).toEqual(preload.results.length);
});

test('Search should render correct amount of cities', () => {
    const component = shallow(<List city={{ name: '' }} cities={citesData.cities} />);
    expect(component.find(Cities).length).toEqual(citesData.cities.length);
});
