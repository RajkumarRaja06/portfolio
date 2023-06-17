import '../style/index.css';
import Title from './Title';
import '../style/contact.css';
import { AiOutlineSend } from 'react-icons/ai';
import { useState } from 'react';

const Contact = () => {
  // const [users, setUsers] = useState({ name: '', email: '', message: '' });

  // function handleOnchange(event) {
  //   setUsers({
  //     ...users,
  //     [event.target.name]: '',
  //   });
  // }

  return (
    <div className='contact' id='contact'>
      <Title name='Contact Me' subtitle='Get in touch' />
      <form
        className='contact-form'
        action='https://formsubmit.co/rkrajkumarco@gmail.com'
        method='POST'
      >
        <input
          type='text'
          name='name'
          placeholder='Enter your Name'
          className='contact-form-name'
          required
          // onSubmit={(event) => handleOnchange(event)}
        />

        <input
          type='email'
          name='email'
          placeholder='Enter a valid email address'
          className='contact-form-email'
          required
          // onSubmit={(event) => handleOnchange(event)}
        />

        <textarea
          name='message'
          cols='30'
          rows='10'
          className='contact-form-message'
          placeholder='Message'
          required
          // onSubmit={(event) => handleOnchange(event)}
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
