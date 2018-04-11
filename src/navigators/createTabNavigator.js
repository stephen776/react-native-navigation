/* eslint-disable new-cap */
import _ from 'lodash';
import {TabNavigator, StackNavigator} from 'react-navigation';

export const createTabNavigator = config => {
  const tabRoutes = _.reduce(config.routes, (result, route, key) => ({
    ...result,
    [key]: {screen: route.screen || StackNavigator(route.stack, {initialRouteName: route.initialRouteName})},
  }), {});

  return TabNavigator(tabRoutes, config.config);
};
