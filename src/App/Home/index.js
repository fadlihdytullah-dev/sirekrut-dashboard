// @flow
import * as React from 'react';
import {Typography} from 'antd';
import View from '../../components/shared/View';
import logo from './../../components/layouts/logo.png';
import ContentWrapper from '../../components/layouts/ContentWrapper';

function HomePage() {
  return (
    <ContentWrapper isCenter>
      <View textAlign="center">
        <View marginTop={32}>
          <View marginBottom={16}>
            <img src={logo} style={{width: '150px'}} alt="SiRekrut Logo" />
          </View>
          <Typography.Title level={2}>
            SiRekrut <Typography.Text type="warning">Dashboard</Typography.Text>
          </Typography.Title>
          <Typography.Paragraph>
            Sistem Informasi{' '}
            <Typography.Text type="danger">Telkom University</Typography.Text>
          </Typography.Paragraph>
        </View>
      </View>
    </ContentWrapper>
  );
}

export default HomePage;
