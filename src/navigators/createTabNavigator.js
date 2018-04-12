/* eslint-disable new-cap */
import _ from 'lodash';
import {TabNavigator, StackNavigator} from 'react-navigation';

export const createTabNavigator = config => {
  return TabNavigator(config.routes, config.config);
};
