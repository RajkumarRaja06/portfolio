import '../style/index.css';
import '../style/navbar.css';
import { navbarList } from '../data';
import { BsMoon, BsXLg } from 'react-icons/bs';
import { ImSun } from 'react-icons/im';
import { BiGridAlt } from 'react-icons/bi';
import { useState } from 'react';

const Navbar = () => {
  const [isChangeButton, setIsChangeButton] = useState(true);
  const [isMenuButton, setIsMenuButton] = useState(false);

  const changeMode = () => {
    setIsChangeButton((isChangeButton) => !isChangeButton);
  };

  const darkMode = () => {
    document.querySelector('body').setAttribute('class', 'dark-theme');
    return <ImSun />;
  };

  const lightMode = () => {
    document.querySelector('body').setAttribute('class', 'light-theme');
    return <BsMoon />;
  };

  const changeMenuBtn = () => {
    setIsMenuButton((isMenuButton) => !isMenuButton);
  };

  return (
    <nav>
      <div className='navbar'>
        <h1 className='logo'>RajkumarRaja</h1>
        <div className='menu'>
          <ul
            className={`${
              isMenuButton ? 'navbar-list active-navbar-list' : 'navbar-list'
            }`}
          >
            {navbarList.map((data) => {
              const { icon, href, name, id } = data;
              return (
                <li key={id} onClick={changeMenuBtn}>
                  <a href={href} className='nav-menu'>
                    <span className='nav-icon'>{icon}</span>
                    <span className='nav-icon-name'>{name}</span>
                  </a>
                </li>
              );
            })}
          </ul>
          <div className='menuBtn'>
            <button type='button' className='darkLight' onClick={changeMode}>
              {isChangeButton ? darkMode() : lightMode()}
            </button>
            <button type='button' className='menuIcon' onClick={changeMenuBtn}>
              {isMenuButton ? <BsXLg /> : <BiGridAlt />}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
