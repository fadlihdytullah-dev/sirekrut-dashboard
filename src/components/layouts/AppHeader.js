// @flow
import * as React from 'react';

import styled from 'styled-components';
import {Link} from 'react-router-dom';
import {Layout} from 'antd';

const {Header} = Layout;

const StyledHeader = styled(Header)`
  background: #fff;
  border-bottom: 2px solid #f7f7f7;
  position: fixed;
  zindex: 1;
  width: 100%;
`;

const styles = {
  logo: {
    width: '120px',
    height: '31px',
    background: 'rgba(0, 0, 0, 0.2)',
    margin: '16px 24px 16px 0',
    float: 'left',
  },
};

function AppHeader() {
  return (
    <StyledHeader>
      <Link to="/">
        <div className="logo" style={styles.logo} />
      </Link>
    </StyledHeader>
  );
}

export default AppHeader;
