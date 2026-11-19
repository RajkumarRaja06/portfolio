import '../style/index.css';
import '../style/navbar.css';
import { navbarList } from '../data';
import { BsMoon, BsXLg } from 'react-icons/bs';
import { ImSun } from 'react-icons/im';
import { BiGridAlt } from 'react-icons/bi';
import { useState } from 'react';
import { Link } from 'react-scroll';
import mouse from '../images/mouse.svg';

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
        <div className='logo'>
          <img src={mouse} alt='Mouse Icon' />
          <div className='logoBorder'></div>
          <div className='name1'>RAJKUMAR</div>
          <div className='name2'>RAJA</div>
        </div>
        <div className='menu'>
          <ul
            className={`${
              isMenuButton ? 'navbar-list active-navbar-list' : 'navbar-list'
            }`}
          >
            {navbarList.map((data) => {
              const { icon, href, name, id, offset } = data;
              return (
                <li key={id}>
                  <Link
                    className='nav-menu'
                    activeClass='active'
                    to={href}
                    spy={true}
                    smooth={true}
                    offset={offset}
                    duration={500}
                    onClick={changeMenuBtn}
                  >
                    <span className='nav-icon'>{icon}</span>
                    <span className='nav-icon-name'>{name}</span>
                  </Link>
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
