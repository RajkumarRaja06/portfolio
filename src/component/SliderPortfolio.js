import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../style/slider.css';
import { BsBoxArrowUpRight } from 'react-icons/bs';
import { FiGithub } from 'react-icons/fi';
import { portfolioSliders } from '../data';

const SliderPortfolio = () => {
  var settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 3,
    autoplay: false,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className='slider-container'>
      <div className='slider-software-name'>HTML CSS JavaScript</div>
      <Slider {...settings}>
        {portfolioSliders.map(({ id, name, img, description, code, demo }) => (
          <div className='slider' key={id}>
            <div className='slider-img'>
              <img src={img} alt={name} />
            </div>
            <div className='slider-data'>
              <div className='slider-data-name'>{name}</div>
              <div className='slider-data-description'>{description}</div>
              <div className='slider-data-btn'>
                <button className='portfolio-project-github-btn'>Link</button>
                {/* <a href={code} target='blank' className='gitHub-icon'></a> */}

                <a href={demo} target='blank' className='demo-icon'>
                  <button className='portfolio-project-host-btn'>
                    <BsBoxArrowUpRight />
                  </button>
                </a>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default SliderPortfolio;
