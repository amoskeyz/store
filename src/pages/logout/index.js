import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import Cookies from 'js-cookie';
import { log_out } from 'g_actions/user';
import { axiosInstance } from 'helpers';

const Logout = () => {
  const dispatch = useDispatch();
  const history = useRouter();
  const redirectUrl = window.location.href.split('redirect=')[1];

  const logout = async () => {
    try {
      await axiosInstance.get('/logout');
      dispatch(log_out());
      Cookies.remove('jayne');
      Cookies.remove('jay_ne');
      history.push('/');
    } catch (err) {
      window.location.href = redirectUrl || '/';
    }
  };

  useEffect(() => {
    logout();
  }, []);

  return <div />;
};

export default Logout;
