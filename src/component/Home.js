import '../style/index.css';
import '../style/home.css';
import { socialMediaIcon } from '../data';
import { AiOutlineSend } from 'react-icons/ai';

const Home = () => {
  return (
    <div className='home' id='home'>
      <div className='social-media-icon'>
        {socialMediaIcon.map(({ id, icon }) => {
          return (
            <a href='#' key={id}>
              {icon}
            </a>
          );
        })}
      </div>
      <div className='about'>
        <div className='content'>
          <h1 className='name'>Hi, I am Rajkumar</h1>
          <h6 className='softwareName'>Web Developer</h6>
          <p className='description'>
            I have a passion for building intuitive, user-friendly interfaces
            that provide an enjoyable and seamless user experience.
          </p>
          <button type='button' className='btn connect'>
            <a href='#home'>
              Connect Me
              <span className='connect-icon'>
                <AiOutlineSend />
              </span>
            </a>
          </button>
        </div>
        <div className='imageContainer'>
          <div className='imageBorder'>
            <img src={'../public/men.jpg'} alt='profilePic' />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
