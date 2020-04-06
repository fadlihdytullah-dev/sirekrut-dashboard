// @flow
import * as React from 'react';

import {Layout} from 'antd';
import View from '../shared/View';

const {Content} = Layout;

type Props = {
  isCenter?: boolean,
  children: React$Node,
};

const styles = {};

function ContentWrapper(props: Props) {
  return (
    <Content>
      <View
        padding={32}
        background="#fff"
        style={styles.content}
        flexJustifyContent={props.isCenter ? 'center' : undefined}
        flexAlignItems={props.isCenter ? 'center' : undefined}>
        {props.children}
      </View>
    </Content>
  );
}

export default ContentWrapper;
