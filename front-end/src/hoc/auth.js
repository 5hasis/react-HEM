import React, { useEffect } from 'react';
import Cookies from 'universal-cookie';
import { useDispatch } from "react-redux";

export function getAccessToken() {
    const cookies = new Cookies();

    const accessToken = cookies.get('accessToken');
    if (accessToken) {
      return {
        access_token:accessToken
      };
    } else {
      return undefined;
    }
  }