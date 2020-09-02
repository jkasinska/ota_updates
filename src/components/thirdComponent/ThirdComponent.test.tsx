import { fireEvent, render, RenderAPI } from '@testing-library/react-native';
import 'jest-extended';
import React from 'react';
import { reactNavigationMock } from '../../../__tests__/mocks/reactNavigation.mock';
import ThirdComponent from './ThirdComponent';

describe('ThirdComponent should', () => {
  let component: RenderAPI;
  const props = {
    ...reactNavigationMock,
  };

  beforeEach(() => {
    component = render(<ThirdComponent {...props} />);
  });

  it('match the snapshot', () => {
    expect(component).toMatchSnapshot();
  });

  it('navigate to ThirdComponentDetails', () => {
    const { getByText } = component;

    fireEvent.press(getByText('Details of Item 1'));

    expect(props.navigation.navigate).toHaveBeenCalledTimes(1);
    expect(props.navigation.navigate).toHaveBeenCalledWith(
      'ThirdComponentDetails123',
      {
        id: expect.toBeString(),
        title: 'Item 1',
        key: '0',
      },
    );
  });
});
