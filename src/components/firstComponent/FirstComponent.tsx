import React, { Component } from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import CodePush, {
  DownloadProgress,
  LocalPackage,
  UpdateDialog,
} from 'react-native-code-push';

interface FirstComponentState {
  progress: DownloadProgress | null;
  restartAllowed: boolean;
  syncMessage: string;
}

class FirstComponent extends Component<{}, FirstComponentState> {
  constructor(props: {}) {
    super(props);
    this.state = { restartAllowed: true, syncMessage: '', progress: null };
  }

  codePushStatusDidChange(syncStatus: CodePush.SyncStatus) {
    const {
      CHECKING_FOR_UPDATE,
      DOWNLOADING_PACKAGE,
      AWAITING_USER_ACTION,
      INSTALLING_UPDATE,
      UP_TO_DATE,
      UPDATE_IGNORED,
      UPDATE_INSTALLED,
      UNKNOWN_ERROR,
    } = CodePush.SyncStatus;
    switch (syncStatus) {
      case CHECKING_FOR_UPDATE:
        this.setState({ syncMessage: 'Checking for update.' });
        break;
      case DOWNLOADING_PACKAGE:
        this.setState({ syncMessage: 'Downloading package.' });
        break;
      case AWAITING_USER_ACTION:
        this.setState({ syncMessage: 'Awaiting user action.' });
        break;
      case INSTALLING_UPDATE:
        this.setState({ syncMessage: 'Installing update.' });
        break;
      case UP_TO_DATE:
        this.setState({ syncMessage: 'App up to date.', progress: null });
        break;
      case UPDATE_IGNORED:
        this.setState({
          syncMessage: 'Update cancelled by user.',
          progress: null,
        });
        break;
      case UPDATE_INSTALLED:
        this.setState({
          syncMessage: 'Update installed and will be applied on restart.',
          progress: null,
        });
        break;
      case UNKNOWN_ERROR:
        this.setState({
          syncMessage: 'An unknown error occurred.',
          progress: null,
        });
        break;
    }
  }

  codePushDownloadDidProgress(progress: DownloadProgress) {
    this.setState({ progress });
  }

  toggleAllowRestart() {
    this.state.restartAllowed
      ? CodePush.disallowRestart()
      : CodePush.allowRestart();

    this.setState({ restartAllowed: !this.state.restartAllowed });
  }

  getUpdateMetadata() {
    CodePush.getUpdateMetadata(CodePush.UpdateState.RUNNING).then(
      (metadata: LocalPackage | null) => {
        return this.setState({
          syncMessage: metadata
            ? JSON.stringify(metadata)
            : 'Running binary version',
          progress: null,
        });
      },
      (error: any) => {
        this.setState({ syncMessage: 'Error: ' + error, progress: null });
      },
    );
  }

  /** Update is downloaded silently, and applied on restart (recommended) */
  sync() {
    CodePush.sync(
      {},
      this.codePushStatusDidChange.bind(this),
      this.codePushDownloadDidProgress.bind(this),
    );
  }

  /** Update pops a confirmation dialog, and then immediately reboots the app */
  syncImmediate() {
    CodePush.sync(
      {
        installMode: CodePush.InstallMode.IMMEDIATE,
        updateDialog: true as UpdateDialog,
      },
      this.codePushStatusDidChange.bind(this),
      this.codePushDownloadDidProgress.bind(this),
    );
  }

  render() {
    let progressView;

    if (this.state.progress) {
      progressView = (
        <Text style={styles.messages}>
          {this.state.progress.receivedBytes} of{' '}
          {this.state.progress.totalBytes} bytes received
        </Text>
      );
    }

    return (
      <View style={styles.container}>
        <Image
          style={styles.logo}
          source={require('../../../assets/react-img.png')}
        />
        <Text>TEST</Text>
        <Text style={styles.welcome}>Welcome to CodePush! (4)</Text>
        <TouchableOpacity onPress={this.sync.bind(this)}>
          <Text style={styles.syncButton}>Press for background sync</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.syncImmediate.bind(this)}>
          <Text style={styles.syncButton}>Press for dialog-driven sync</Text>
        </TouchableOpacity>
        {progressView}
        <TouchableOpacity onPress={this.toggleAllowRestart.bind(this)}>
          <Text style={styles.restartToggleButton}>
            Restart {this.state.restartAllowed ? 'allowed' : 'forbidden'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.getUpdateMetadata.bind(this)}>
          <Text style={styles.syncButton}>Press for Update Metadata</Text>
        </TouchableOpacity>
        <Text style={styles.messages}>{this.state.syncMessage || ''}</Text>

        <Text style={styles.title}>FirstComponent</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    paddingTop: 50,
  },
  image: {
    margin: 30,
    width: Dimensions.get('window').width - 100,
    height: (365 * (Dimensions.get('window').width - 100)) / 651,
  },
  messages: {
    marginTop: 30,
    textAlign: 'center',
  },
  restartToggleButton: {
    color: 'blue',
    fontSize: 17,
  },
  syncButton: {
    color: 'green',
    fontSize: 17,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 20,
  },
  title: {
    fontSize: 15,
    textAlign: 'center',
    margin: 20,
  },
  logo: {
    resizeMode: 'cover',
    height: 100,
    width: 200,
  },
});

/**
 * Configured with a MANUAL check frequency for easy testing. For production apps, it is recommended to configure a
 * different check frequency, such as ON_APP_START, for a 'hands-off' approach where CodePush.sync() does not
 * need to be explicitly called. All options of CodePush.sync() are also available in this decorator.
 */
let codePushOptions = { checkFrequency: CodePush.CheckFrequency.ON_APP_START };
export default CodePush(codePushOptions)(FirstComponent);
