import React from 'react';
import { render } from '@testing-library/react-native';
import FirstComponent from './FirstComponent';

describe('FirstComponent should', () => {
  test('should match the snapshot', () => {
    const component = render(<FirstComponent />);
    expect(component).toMatchSnapshot();
  });

  test('find by label', () => {
    const component = render(<FirstComponent />);
    const { getByText } = component;

    expect(getByText('TEST')).toBeTruthy();
  });
});
