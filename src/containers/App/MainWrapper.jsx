import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Spinner from 'react-spinner-material';
import {
  CustomizerProps, ThemeProps, RTLProps,
} from '../../shared/prop-types/ReducerProps';
import { fetchAppConfig } from '../../redux/actions/appConfigActions';
import Loading from '../../shared/components/Loading';

const wrapperClass = (customizer) => {
  classNames({
    wrapper: true,
    'squared-corner-theme': customizer.squaredCorners,
    'blocks-with-shadow-theme': customizer.withBoxShadow,
    'top-navigation': customizer.topNavigation,
  });
};

const direction = (location, rtl) => (location.pathname === '/' ? 'ltr' : rtl.direction);

const MainWrapper = ({
  theme, customizer, children, rtl, location, fetchAppConfigAction, isFetching,
}) => {
  useEffect(() => {
    fetchAppConfigAction();
  }, [fetchAppConfigAction]);

  return (
    <Fragment>
      {isFetching ? (
        <Spinner size={120} style={{display: 'flex',width: '100%', height: '100%',borderColor: '#b22222', justifyContent: 'center', alignItems: 'center'}} spinnerColor={"#b22222"} spinnerWidth={2} visible={true} />
        // <Spinner loading={isFetching} animation="border" variant="light" />
        //  {/*<Loading loading={isFetching} />*/}
      ) : (
        <div className={`${theme.className} ${direction(location, rtl)}-support`} dir={direction(location, rtl)}>
          <div className={wrapperClass(customizer)}>
            {/* <div>
            <Spinner size={120} style={{display: 'flex',width: '100%', height: '100%', justifyContent: 'center', borderColor: '#cb2020', alignItems: 'center'}} spinnerColor={"#b22222"} spinnerWidth={2} visible={true} />
            </div> */}
            {children}
          </div>
        </div>
      )}
    </Fragment>
  );
};

MainWrapper.propTypes = {
  customizer: CustomizerProps.isRequired,
  theme: ThemeProps.isRequired,
  rtl: RTLProps.isRequired,
  fetchAppConfigAction: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
  isFetching: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => {
  const appConfig = state.appConfig && state.appConfig.data
  && state.appConfig.data.length > 0 ? [...state.appConfig.data] : [];
  return ({
    appConfig, // delete if don't use it
    theme: state.theme,
    rtl: state.rtl,
    customizer: state.customizer,
    isFetching: state.appConfig.isFetching,
  });
};

const mapDispatchToProps = {
  fetchAppConfigAction: fetchAppConfig,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MainWrapper));
