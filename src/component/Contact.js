import '../style/index.css';
import Title from './Title';
import '../style/contact.css';
import { AiOutlineSend } from 'react-icons/ai';

const Contact = () => {
  return (
    <div className='contact' id='contact'>
      <Title name='Contact Me' subtitle='Get in touch' />
      <form className='contact-form'>
        <input
          type='text'
          placeholder='Enter your Name'
          className='contact-form-name'
        />
        <input
          type='email'
          placeholder='Enter a valid email address'
          className='contact-form-email'
        />
        <textarea
          name='message'
          id=''
          cols='30'
          rows='10'
          className='contact-form-message'
          placeholder='Message'
        ></textarea>
        <div className='btn-container'>
          <button type='submit' className='btn connect'>
            Send Message
            <span className='connect-icon'>
              <AiOutlineSend />
            </span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default Contact;
