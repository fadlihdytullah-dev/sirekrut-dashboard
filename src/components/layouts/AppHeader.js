// @flow
import * as React from 'react';

import styled from 'styled-components';
import {Link} from 'react-router-dom';
import {Layout, Typography} from 'antd';
import logo from './logo.png';

const {Header} = Layout;

const StyledHeader = styled(Header)`
  background: #fff;
  border-bottom: 2px solid #f7f7f7;
  position: fixed;
  zindex: 1;
  width: 100%;
`;

const styles = {
  logoTitle: {
    fontSize: '2rem',
    color: '#111',
  },
};

function AppHeader() {
  return (
    <StyledHeader>
      <Link to="/">
        <img src={logo} alt="Logo SiRekrut" width={40} />{' '}
        <Typography.Text strong style={styles.logoTitle}>
          SiRekrut{' '}
        </Typography.Text>
        <Typography.Text>- Sistem Informasi Rekrutasi </Typography.Text>
        <Typography.Text type="danger">Telkom University</Typography.Text>
      </Link>
    </StyledHeader>
  );
}

export default AppHeader;
