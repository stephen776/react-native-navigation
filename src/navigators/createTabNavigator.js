/* eslint-disable new-cap */
import {TabNavigator} from 'react-navigation';

export const createTabNavigator = config => {
  return TabNavigator(config.routes, config.config);
};
