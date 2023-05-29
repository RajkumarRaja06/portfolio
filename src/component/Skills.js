import '../style/index.css';
import '../style/skills.css';
import { skillsImage } from '../data';

const Skills = () => {
  return (
    <section className='skills-section'>
      <h2 className='section-title'>Skills</h2>
      <span className='section-subtitle'>My tech stack</span>
      <div className='skills-container'>
        <div className='skills-container-box'>
          {skillsImage.map((item) => {
            return (
              <div className='skills-image-box'>
                <img
                  className='skill-img'
                  id={item.id}
                  src={item.img}
                  alt={item.name}
                />
                <div className='skill-name'>{item.name}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;
