// @flow
import * as React from 'react';

import {Typography} from 'antd';
import View from '../shared/View';

type Props = {
  hasBack?: boolean,
  title: string | React$Node,
  subtitle?: string | React$Node,
  rightContent?: React$Node,
};

const {Title, Text} = Typography;

const styles = {
  title: {marginBottom: 4},
};

function Header({title, subtitle, hasBack, rightContent}: Props) {
  return (
    <React.Fragment>
      <View flexDirection="row" flexJustifyContent="space-between">
        <View>
          {typeof title === 'string' ? (
            <Title level={2} style={styles.title}>
              {title}
            </Title>
          ) : (
            title
          )}
          {subtitle && typeof title === 'string' ? (
            <Text type="secondary">{subtitle}</Text>
          ) : (
            subtitle
          )}
        </View>

        {rightContent}
      </View>
    </React.Fragment>
  );
}

export default Header;
