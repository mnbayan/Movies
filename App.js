import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { vs } from 'react-native-size-matters';
import { ROUTES, COLORS } from 'constants';
import { AccountProvider } from 'contexts';
import { HomeStack, WatchListStack } from 'navigation';
import LoginScreen from 'screens/LoginScreen';

const MainTabStack = createBottomTabNavigator(
  {
    Home: HomeStack,
    WatchList: WatchListStack
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      // eslint-disable-next-line react/prop-types
      tabBarIcon: ({ tintColor }) => {
        const { routeName } = navigation.state;

        if (routeName === ROUTES.home) {
          return <MaterialIcon name="home" size={30} color={tintColor} />;
        }

        return <MaterialIcon name="bookmark" size={25} color={tintColor} />;
      },
      tabBarVisible: navigation.state.index === 0
    }),
    tabBarOptions: {
      activeTintColor: COLORS.primaryGreen,
      labelStyle: {
        fontSize: vs(13)
      }
    }
  }
);

const navigator = createSwitchNavigator({
  Login: LoginScreen,
  MainFlow: MainTabStack
});

const App = createAppContainer(navigator);

export default () => (
  <AccountProvider>
    <App />
  </AccountProvider>
);
