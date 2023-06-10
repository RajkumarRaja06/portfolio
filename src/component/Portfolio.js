import '../style/skills.css';
import '../style/portfolio.css';
import PortfolioData from './PortfolioData';

const Portfolio = () => {
  return (
    <div className='portfolio' id='portfolio'>
      <div className='portfolio-title'>
        <h2 className='portfolio-name'>Portfolio</h2>
        <span className='portfolio-subtitle'>Most recent work</span>
      </div>
      <PortfolioData />
    </div>
  );
};

export default Portfolio;
