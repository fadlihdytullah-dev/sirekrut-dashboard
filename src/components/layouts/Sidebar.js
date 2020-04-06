// @flow
import * as React from 'react';
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
    key: 'timelines',
    label: 'Periode',
    icon: <CalendarOutlined style={styles.customMenuIcon} />,
  },
  {
    key: 'study-programs',
    label: 'Program Study',
    icon: <GoldOutlined style={styles.customMenuIcon} />,
  },
  {
    key: 'positions',
    label: 'Posisi',
    icon: <SolutionOutlined style={styles.customMenuIcon} />,
  },
  {
    key: 'forms',
    label: 'Formulir',
    icon: <FileTextOutlined style={styles.customMenuIcon} />,
  },
  {
    key: 'applicants',
    label: 'Pelamar',
    icon: <FileSearchOutlined style={styles.customMenuIcon} />,
  },
  {
    key: 'reporting',
    label: 'Laporan',
    icon: <BarChartOutlined style={styles.customMenuIcon} />,
  },
];

function Sidebar() {
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
      <Menu theme="light" mode="inline" style={{background: '#f7f7f7'}}>
        {MENUS.map(({key, label, icon}) => (
          <Menu.Item key={key}>
            {icon}
            <span style={{fontSize: '1.4rem'}}>{label}</span>
          </Menu.Item>
        ))}
      </Menu>
    </Sider>
  );
}

export default Sidebar;
