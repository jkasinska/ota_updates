import { render } from '@testing-library/react-native';
import React from 'react';
import { reactNavigationMock } from '../../../__tests__/mocks/reactNavigation.mock';
import ThirdComponentDetails from './ThirdComponentDetails';

describe('ThirdComponentDetails should', () => {
  it('match the snapshot', () => {
    const component = render(
      <ThirdComponentDetails
        {...reactNavigationMock}
        route={{
          key: '',
          name: 'ThirdComponentDetails',
          params: {
            title: 'testTitle',
            key: '',
            id: '',
          },
        }}
      />,
    );
    expect(component).toMatchSnapshot();
  });
});
