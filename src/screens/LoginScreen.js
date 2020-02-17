import React, { Component } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { vs, ms } from 'react-native-size-matters';
import Toast from 'react-native-simple-toast';
import { TextField, Spacer, Button, Spinner, Container } from 'components';
import { ROUTES, IMAGES, COLORS } from 'constants';
import { login } from 'services';

class LoginScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      isLoggingIn: false
    };
  }

  async _login() {
    const { username, password } = this.state;

    this.setState(() => ({ isLoggingIn: true }));

    login(username, password)
      .then(() => {
        this.setState(() => ({ isLoggingIn: false }));

        const { navigation } = this.props;
        navigation.navigate(ROUTES.mainFlow);
      })
      .catch(() => {
        this.setState(() => ({ isLoggingIn: false }));
        Toast.show('An error occurred. Please try again.');
      });
  }

  render() {
    const { username, password, isLoggingIn } = this.state;

    return (
      <Container>
        <Spacer>
          <Spacer />
          <Text style={styles.title}>Login to your TMDb account</Text>
          <Spacer />

          <TextField
            label="Username"
            hint="username"
            value={username}
            onChangeText={(text) => this.setState(() => ({ username: text }))}
          />

          <Spacer margin={8} />

          <TextField
            label="Password"
            hint="password"
            value={password}
            secureTextEntry
            onChangeText={(text) => this.setState(() => ({ password: text }))}
          />

          <Spacer />

          <View style={styles.buttonContainer}>
            {isLoggingIn ? (
              <Spinner color={COLORS.primaryGreen} />
            ) : (
              <Button title="Login" onPress={() => this._login()} />
            )}
          </View>
        </Spacer>

        <View style={[styles.center, styles.imagePosition]}>
          <Image style={styles.image} source={IMAGES.poweredBy} />
        </View>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  fill: { flex: 1 },
  center: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonContainer: { height: vs(40) },
  title: { fontSize: ms(18) },
  imagePosition: {
    position: 'absolute',
    bottom: vs(16),
    left: 0,
    right: 0
  },
  image: {
    height: 53,
    width: 136,
    resizeMode: 'contain'
  }
});

export default LoginScreen;
