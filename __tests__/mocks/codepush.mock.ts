const codePush = {
  InstallMode: { ON_NEXT_RESTART: 'ON_APP_RESTART' },
  CheckFrequency: { ON_APP_RESUME: 'ON_APP_RESUME' },
};

const cb = (_: any) => (app: any) => app;
Object.assign(cb, codePush);
export default cb;

jest.mock('react-native-code-push', () => {
  return jest.fn(() => ({
    InstallMode: jest.fn(),
    CheckFrequency: jest.fn(),
    CodePushComponent: jest.fn(),
    codePushify: jest.fn(),
  }));
});
