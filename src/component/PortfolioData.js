import '../style/skills.css';
import '../style/portfolio.css';
import { FaLessThan, FaGreaterThan } from 'react-icons/fa';
import { BsBoxArrowUpRight } from 'react-icons/bs';
import { FiGithub } from 'react-icons/fi';
import { portfolioSliders1 } from '../data';
import { useState } from 'react';

const PortfolioData = () => {
  const [users, setUsers] = useState(portfolioSliders1);
  const [index, setIndex] = useState(0);

  const prevUserHandler = () => {
    const lastIndex = users.length - 1;
    if (index === 0) {
      setIndex(lastIndex);
    } else {
      setIndex((index) => index - 1);
    }
  };
  const nextUserHandler = () => {
    const lastIndex = users.length - 1;
    if (index === lastIndex) {
      setIndex(0);
    } else {
      setIndex((index) => index + 1);
    }
  };

  return (
    <div className='portfolio-data'>
      <div className='portfolio-project-software'>
        <div className='portfolio-software-name'>React Js</div>
        <div className='portfolio-dot'>
          {users.map((item, btnIndex) => (
            <button
              className={`portfolio-dot-border ${
                index === btnIndex ? 'active-border' : null
              }`}
              id={item.id}
              key={item.id}
              onClick={() => setIndex(btnIndex)}
            ></button>
          ))}
        </div>
      </div>
      <>
        {users.map((user, position) => {
          const { id, name, img, code, demo, description } = user;
          let placement = 'nextSlide';
          if (position === index) {
            placement = 'activeSlide';
          } else if (position === index - 1) {
            placement = 'prevSlide';
          }
          return (
            <article id='portfolio-content' className={placement} key={id}>
              <div className='portfolio-image'>
                <img src={img} alt={name} />
              </div>
              <div className='portfolio-project-data'>
                <div className='portfolio-project-name'>{name}</div>
                <div className='portfolio-project-description'>
                  {description}
                </div>
                <div className='portfolio-project-btn'>
                  <button className='portfolio-project-github-btn'>
                    <a href={code} className='gitHub-icon'>
                      <FiGithub />
                    </a>
                  </button>
                  <button className='portfolio-project-host-btn'>
                    <a href={demo} className='demo-icon'>
                      <BsBoxArrowUpRight />
                    </a>
                  </button>
                </div>
              </div>
            </article>
          );
        })}
      </>
      <div className='prev-btn' onClick={prevUserHandler}>
        <FaLessThan />
      </div>
      <div className='next-btn' onClick={nextUserHandler}>
        <FaGreaterThan />
      </div>
    </div>
  );
};

export default PortfolioData;
