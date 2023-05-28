import '../style/index.css';
import '../style/navBar.css';
import { navBarList } from '../data';
import { BsMoon, BsXLg } from 'react-icons/bs';
import { ImSun } from 'react-icons/im';
import { BiGridAlt } from 'react-icons/bi';

const NavBar = () => {
  return (
    <nav>
      <div className='navBar'>
        <h1 className='logo'>RajkumarRaja</h1>
        <div className='menu'>
          <ul className='navBarList'>
            {navBarList.map((data) => {
              return (
                <>
                  <li>
                    <a href='#navbar' className='nav-menu'>
                      <span className='nav-icon'>{data.icon}</span>
                      <span className='nav-icon-name'>{data.iconName}</span>
                    </a>
                  </li>
                </>
              );
            })}
          </ul>
          <div className='menuBtn'>
            <button type='button' className='darkLight'>
              {/* <BsMoon /> */}
              <ImSun />
            </button>
            <button type='button' className='menuIcon'>
              <BiGridAlt />
              {/* <BsXLg /> */}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
