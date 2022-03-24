import { useState, useEffect } from 'react'
import TodoItem from 'components/TodoItem'
import Contract  from '@truffle/contract'
import NewTodo from 'components/NewTodo'

import { Menu, Dropdown, Button, message, Space, Tooltip } from 'antd';
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import { Layout } from 'antd';

const { Header } = Layout;

// import styled from 'styled-components';

// const DescWrapper = styled.div`
//   background: white;
//   text-align: center;
//   padding: 40px;
//   h1 {
//     overflow-wrap: initial;
//   }
// `;


export default function ConnectWallet({ account, provider }) {
    const menu = (
        <Menu onClick={() => {}}>
          <Menu.Item key="1" icon={<UserOutlined />}>
            1st menu item
          </Menu.Item>
          <Menu.Item key="2" icon={<UserOutlined />}>
            2nd menu item
          </Menu.Item>
          <Menu.Item key="3" icon={<UserOutlined />}>
            3rd menu item
          </Menu.Item>
        </Menu>
      );
    return (
        <Header>
          Header
            <Dropdown overlay={menu}>
                <Button>
                    Button <DownOutlined />
                </Button>
            </Dropdown>
        </Header>
    )
  }
  