import Title from './Title';
import { socialMediaIcon, footerLinks } from '../data';
import '../style/footer.css';

const Footer = () => {
  return (
    <footer>
      <div className='footer-data'>
        <Title name='Web Developer' subtitle='Web Developer' />
        <div className='footer-nav-link'>
          {footerLinks.map((link) => {
            const { name, href } = link;
            return (
              <a href={href} className='footer-icon'>
                {name}
              </a>
            );
          })}
        </div>
        <div className='social-media-icon'>
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
