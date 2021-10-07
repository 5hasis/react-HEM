import React from 'react';
import { Menu } from 'antd';
import axios from 'axios';
//import { USER_SERVER } from '../../../Config';
import { withRouter } from 'react-router-dom';
import { useSelector } from "react-redux";

function RightMenu(props) {
  const user = useSelector(state => state.user)

  const logoutHandler = () => {
    axios.get('/api/member/logout').then(response => {
      // console.log(response.data)
      // console.log(response.data.accessToken)
      if (!response.data.accessToken) {
        window.localStorage.removeItem('accessToken')
        //window.localStorage.setItem('accessToken', response.payload.accessToken);
        props.history.push("/login");
      } else {
        alert('Log Out Failed')
      }
    });
  };

  if (!user) {
    return (
      <Menu mode="horizontal" style={{ width: 256 }}>
        <Menu.Item key="mail">
          <a href="/login">Signin</a>
        </Menu.Item>
        <Menu.Item key="app">
          <a href="/register">Signup</a>
        </Menu.Item>
      </Menu>
    )
  } else {
    return (
      <Menu mode={props.mode}>
        <Menu.Item key="logout">
          <a onClick={logoutHandler}>Logout</a>
        </Menu.Item>
      </Menu>
    )
  }
}

export default withRouter(RightMenu);