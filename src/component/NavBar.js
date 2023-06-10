import '../style/index.css';
import '../style/navbar.css';
import { navbarList } from '../data';
import { BsMoon, BsXLg } from 'react-icons/bs';
import { ImSun } from 'react-icons/im';
import { BiGridAlt } from 'react-icons/bi';

const Navbar = () => {
  return (
    <nav>
      <div className='navbar'>
        <h1 className='logo'>RajkumarRaja</h1>
        <div className='menu'>
          <ul className='navbar-list'>
            {navbarList.map((data) => {
              const { icon, href, name, id } = data;
              return (
                <>
                  <li key={id}>
                    <a href={href} className='nav-menu'>
                      <span className='nav-icon'>{icon}</span>
                      <span className='nav-icon-name'>{name}</span>
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

export default Navbar;
