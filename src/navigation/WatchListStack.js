import { createStackNavigator } from 'react-navigation-stack';
import WatchListScreen from 'screens/WatchListScreen';
import DetailScreen from 'screens/DetailScreen';
import ReviewScreen from 'screens/ReviewScreen';

const WatchListStack = createStackNavigator(
  {
    WatchList: WatchListScreen,
    Details: DetailScreen,
    Reviews: ReviewScreen
  },
  {
    initialRouteName: 'WatchList'
  }
);

export default WatchListStack;
