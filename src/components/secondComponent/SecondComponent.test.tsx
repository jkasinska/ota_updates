import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import SecondComponent from './SecondComponent';

describe('SecondComponent should', () => {
  test('match the snapshot', () => {
    const component = render(<SecondComponent />);
    expect(component).toMatchSnapshot();
  });

  test('change label visibility on button click', () => {
    const component = render(<SecondComponent />);
    const { getByTestId, getByText, queryByTestId, toJSON } = component;
    const newInputValue = 'test test';

    const input = getByTestId('input');
    fireEvent.changeText(input, newInputValue);

    const button = getByText('Change label visibility');
    fireEvent.press(button);

    expect(queryByTestId('value')).toBeTruthy();
    expect(getByTestId('value').props.children).toBe(newInputValue);
    expect(toJSON).toMatchSnapshot();
  });
});
