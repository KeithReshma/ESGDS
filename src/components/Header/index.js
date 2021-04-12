/*eslint-disable*/
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Avatar from 'react-avatar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import Dropdown from 'react-dropdown';

const Header = () => {
  const options = ['Super Admin', 'Employee', 'Analyst', 'Client', 'QA'];
  const defaultOption = options[0];
  const [sideBarMenuIcon, setSideBarMenuIcon] = useState(faBars);

  useEffect(() => {
    window.addEventListener('resize', sideMenuResponsive);

    // Clean-up Function
    return () => {
      window.removeEventListener('resize', sideMenuResponsive);
    };
  },);

  // Function that remove class & change hamburger icon if width >= 541px
  const sideMenuResponsive = () => {
    if (window.innerWidth >= 768) {
      sideBarRef.current.classList.remove('sideMenu-main-responsive');
      setSideBarMenuIcon(faBars);
    }
  };

  // Function that handles Clicks from SideBarMenuIcon
  const sideBarMenuIconClickHandler = () => {
    const target = sideBarRef.current;
    if (target.classList.contains('sideMenu-main-responsive')) {
      target.classList.remove('sideMenu-main-responsive');
      setSideBarMenuIcon(faBars);
    } else {
      target.classList.add('sideMenu-main-responsive');
      setSideBarMenuIcon(faTimes);
    }
  };

  return (
    <div
      className="header-container"
    >
      <div className="header-content-one">
        <Dropdown controlClassName="drop-down-element" menuClassName="drop-down-menu" options={options} value={defaultOption} placeholder="Select an option" />
      </div>
      <div className="header-content-two">
        <Avatar name="Foo Bar" size="38" round />
      </div>
      <div className="header-content-three">
        <FontAwesomeIcon className="bellicon" icon={faBell} style={{ fontSize: '26px', color: '#2199c8' }} />
      </div>
      <div
        className="hamburger-bars-icon"
        onClick={sideBarMenuIconClickHandler}
      >
        <FontAwesomeIcon icon={sideBarMenuIcon} />
      </div>
    </div>
  );
};

export default Header;

