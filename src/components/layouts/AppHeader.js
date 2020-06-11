// @flow
import * as React from 'react';

import styled, {css} from 'styled-components';
import {Link} from 'react-router-dom';
import {Layout, Typography, Button} from 'antd';
import logo from './logo.png';
import View from '../shared/View';
import {AppContext} from '../../contexts/AppContext';
import {useLocation, useHistory} from 'react-router-dom';

const {Header} = Layout;

const StyledHeader = styled(Header)`
  background: #fff;
  border-bottom: 2px solid #f7f7f7;
  position: fixed;
  zindex: 1;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  ${(props) =>
    props.center
      ? css`
          display: flex;
          justify-content: center;
          align-items: center;
        `
      : css``}
`;

const styles = {
  logoTitle: {
    fontSize: '2rem',
    color: '#111',
  },
};

type Props = {
  backLink?: string,
  center?: boolean,
};

function AppHeader(props: Props) {
  const {pathname} = useLocation();
  const {appState, dispatchApp} = React.useContext(AppContext);
  const history = useHistory();
  const handleLogout = () => {
    dispatchApp({type: 'SET_LOGOUT'});
    history.push('/login');
  };

  return (
    <StyledHeader center={props.center}>
      <View>
        <Link to={`${props.backLink || '/'}`}>
          <img src={logo} alt="Logo SiRekrut" width={40} />{' '}
          <Typography.Text strong style={styles.logoTitle}>
            SiRekrut{' '}
          </Typography.Text>
          <Typography.Text>- Sistem Informasi Rekrutasi </Typography.Text>
          <Typography.Text type="danger">Telkom University</Typography.Text>
        </Link>
      </View>
      {pathname !== '/login' && (
        <Button onClick={handleLogout} type="default">
          Logout
        </Button>
      )}
    </StyledHeader>
  );
}

export default AppHeader;
