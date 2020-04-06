// @flow
import * as React from 'react';

import {Typography} from 'antd';

type Props = {
  label: string,
  hasBack?: boolean,
};

const {Title} = Typography;

function Header({label, hasBack = false}: Props) {
  return (
    <React.Fragment>
      <Title level={2}>{label}</Title>
    </React.Fragment>
  );
}

export default Header;
