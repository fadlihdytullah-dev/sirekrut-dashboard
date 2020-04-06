// @flow
import * as React from 'react';

import {Link, useLocation} from 'react-router-dom';

import {Layout, Menu} from 'antd';
import {
  GoldOutlined,
  CalendarOutlined,
  SolutionOutlined,
  FileTextOutlined,
  BarChartOutlined,
  FileSearchOutlined,
} from '@ant-design/icons';

type SideMenu = {
  key: string,
  label: string,
  icon: React$Node,
};

const {Sider} = Layout;

const styles = {
  customMenuIcon: {
    fontSize: '1.6rem',
  },
};

const MENUS: Array<SideMenu> = [
  {
    key: 'timeline',
    label: 'Periode',
    icon: <CalendarOutlined style={styles.customMenuIcon} />,
  },
  {
    key: 'study_program',
    label: 'Program Study',
    icon: <GoldOutlined style={styles.customMenuIcon} />,
  },
  {
    key: 'position',
    label: 'Posisi',
    icon: <SolutionOutlined style={styles.customMenuIcon} />,
  },
  {
    key: 'form',
    label: 'Formulir',
    icon: <FileTextOutlined style={styles.customMenuIcon} />,
  },
  {
    key: 'applicant',
    label: 'Pelamar',
    icon: <FileSearchOutlined style={styles.customMenuIcon} />,
  },
  {
    key: 'reporting',
    label: 'Laporan',
    icon: <BarChartOutlined style={styles.customMenuIcon} />,
  },
];

const getPathName = (value: string) => value.split('/')[1];

function Sidebar() {
  const location = useLocation();

  const {pathname} = location;

  return (
    <Sider
      theme="light"
      width={250}
      style={{
        overflow: 'auto',
        height: '100vh',
        position: 'fixed',
        left: 0,
        background: '#f7f7f7',
        paddingTop: 70,
      }}>
      <Menu
        theme="light"
        mode="inline"
        style={{background: '#f7f7f7'}}
        selectedKeys={[getPathName(pathname)]}>
        {MENUS.map(({key, label, icon}) => (
          <Menu.Item key={key}>
            <Link to={`/${key}`}>
              {icon}
              <span style={{fontSize: '1.4rem'}}>{label}</span>
            </Link>
          </Menu.Item>
        ))}
      </Menu>
    </Sider>
  );
}

export default Sidebar;
