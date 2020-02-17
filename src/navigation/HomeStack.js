import { createStackNavigator } from 'react-navigation-stack';
import HomeScreen from 'screens/HomeScreen';
import DetailScreen from 'screens/DetailScreen';
import ReviewScreen from 'screens/ReviewScreen';

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
    Details: DetailScreen,
    Reviews: ReviewScreen
  },
  {
    initialRouteName: 'Home'
  }
);

export default HomeStack;
