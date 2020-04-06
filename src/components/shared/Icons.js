// @flow
import * as React from 'react';

import styled, {css, type StyledComponent} from 'styled-components';
import {numToRem} from './utils';

type Props = {
  size?: 'small' | 'default' | 'medium' | 'big' | 'extraBig' | 'ultraBig',
  icon: React$Node,
};

const sizeVariant = {
  small: 10,
  default: 16,
  medium: 20,
  big: 24,
  extraBig: 32,
  ultraBig: 48,
};

const CustomIcon: StyledComponent<Props> = styled.div`
  > span {
    ${(props) =>
      css`
        font-size: ${numToRem(sizeVariant[props.size])};
      `}
  }
`;

function Icons(props: Props) {
  return <CustomIcon size={props.size}>{props.icon}</CustomIcon>;
}

Icons.defaultProps = {
  size: 'default',
};

export default Icons;
