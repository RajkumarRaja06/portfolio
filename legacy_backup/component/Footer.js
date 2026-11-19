import { socialMediaIcon, footerLinks } from '../data';
import '../style/footer.css';
import '../style/index.css';

const Footer = () => {
  return (
    <footer>
      <div className='footer-data'>
        <div className='title-container'>
          <h2 className='titleName'>Rajkumar</h2>
          <span className='titleSubtitle'>Web Developer</span>
        </div>
        <div className='footer-nav-link'>
          {footerLinks.map((link, index) => {
            const { name, href } = link;
            return (
              <a href={href} className='footer-icon' key={index}>
                {name}
              </a>
            );
          })}
        </div>
        <div className='social'>
          {socialMediaIcon.map(({ id, icon, link }) => {
            return (
              <a href={link} key={id}>
                {icon}
              </a>
            );
          })}
        </div>
      </div>
      <p className='footer-para'>© Rajkumar Raja. All rights reserved.</p>
    </footer>
  );
};
export default Footer;
