// @flow
import * as React from 'react';

import ContentWrapper from '../../components/layouts/ContentWrapper';
import {Typography} from 'antd';
import {AppstoreOutlined} from '@ant-design/icons';
import View from '../../components/shared/View';
import Icons from '../../components/shared/Icons';

function Home() {
  return (
    <ContentWrapper isCenter>
      <View textAlign="center">
        <Icons icon={<AppstoreOutlined />} size="ultraBig" color="red" />
        <Typography.Title level={2}>
          <Typography.Text type="warning">SiRekrut</Typography.Text> Dashboard
        </Typography.Title>
      </View>
    </ContentWrapper>
  );
}

export default Home;
