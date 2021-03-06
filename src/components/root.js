import React, {Component} from 'react';
import {BackHandler} from 'react-native';
import {connect} from 'react-redux';
import {addNavigationHelpers} from 'react-navigation';
import {createReduxBoundAddListener} from 'react-navigation-redux-helpers';
import autobind from 'autobind-decorator';
import {STANDALONE} from '../services';

import {back} from '../actions';

import {navigationStateSelector, navigationTypeSelector} from '../selectors';
import {getNavigator} from '../services';

import {MIDDLEWARE_FLAG} from '../constants';

class Root extends Component {
  constructor(props) {
    super(props);

    this.addListener = createReduxBoundAddListener(MIDDLEWARE_FLAG);
  }

  // lifecycle
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
  }

  // actions
  @autobind
  onBackPress() {
    const {dispatch, navigationState, navigationType} = this.props;
    if (navigationType === STANDALONE || navigationState.index === 0) {
      return false;
    }

    dispatch(back());
    return true;
  }

  // render
  render() {
    const {navigationType, navigationState, dispatch} = this.props;
    if (!navigationType) {
      return null;
    }

    const Navigator = getNavigator(navigationType);
    const nav = addNavigationHelpers({dispatch, state: navigationState, addListener: this.addListener});

    return (
      <Navigator navigation={nav} />
    );
  }
}

const mapStateToProps = state => ({
  navigationState: navigationStateSelector(state),
  navigationType: navigationTypeSelector(state),
  nav: state.nav,
});

export default connect(mapStateToProps)(Root);
