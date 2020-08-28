export const mockedNavigate = jest.fn();
export const mockedBottomTanNavigator = jest.fn();

jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  const bottomTabs = jest.requireActual('@react-navigation/bottom-tabs');

  // return {
  //   useNavigation: () => ({
  //     navigate: mockedNavigate,
  //   }),
  //   createBottomTabNavigator: jest.fn(),
  // };
  return {
    ...actualNav,
    ...bottomTabs,
    useFocusEffect: () => jest.fn(),
    useFocusEvent: () => jest.fn(),
    useRoute: () => jest.fn(),
    createBottomTabNavigator: mockedBottomTanNavigator,
    useNavigation: () => ({
      navigation: mockedNavigate,
    }),
  };
});

export const reactNavigationMock = {
  navigation: {
    addListener: jest.fn(),
    canGoBack: jest.fn(),
    dangerouslyGetParent: jest.fn(),
    dangerouslyGetState: jest.fn(),
    dispatch: jest.fn(),
    goBack: jest.fn(),
    isFocused: jest.fn(),
    // jumpTo: jest.fn(),
    navigate: jest.fn(),
    // pop: jest.fn(),
    // popToTop: jest.fn(),
    // push: jest.fn(),
    removeListener: jest.fn(),
    // replace: jest.fn(),
    reset: jest.fn(),
    setOptions: jest.fn(),
    setParams: jest.fn(),
  },
  route: {
    key: '',
    name: '',
    params: {},
  },
};
