import '../style/index.css';
import '../style/home.css';
import { socialMediaIcon } from '../data';
import { AiOutlineSend } from 'react-icons/ai';
import image from '../images/me1.jpg';

const Home = () => {
  console.log(image);
  return (
    <div className='home' id='home'>
      <div className='social-media-icon'>
        {socialMediaIcon.map(({ id, icon, link }) => {
          return (
            <a href={link} key={id}>
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
            <a href='#contact'>
              Connect Me
              <span className='connect-icon'>
                <AiOutlineSend />
              </span>
            </a>
          </button>
        </div>
        <div className='imageContainer'>
          <div className='imageBorder'>
            <div className='img-content'>
              <img src={image} alt='profilePic' />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
