import React, { useRef, useState } from 'react';
import Layout from 'layouts/PageSectionWithSide';
import Nav from 'components/SideNav';
import bnrImg from 'images/create.jpg';

const Admin = () => {
  return (
    <Layout
      title="Create New Product"
      image={bnrImg}
      navText="Navigation"
      floating={<Nav />}
    >
      <div className="text-center pb-56">
        Welcome back admin please pick a menu from the side panel to continue
      </div>
    </Layout>
  );
};

export default Admin;
