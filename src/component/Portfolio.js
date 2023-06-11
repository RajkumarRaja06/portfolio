import '../style/skills.css';
import '../style/portfolio.css';
import PortfolioData from './PortfolioData';
import Title from './Title';

const Portfolio = () => {
  return (
    <div className='portfolio' id='portfolio'>
      <Title name='Portfolio' subtitle='Most recent work' />
      <PortfolioData />
    </div>
  );
};

export default Portfolio;
