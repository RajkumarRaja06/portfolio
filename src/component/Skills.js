import '../style/index.css';
import '../style/skills.css';
import { skillsImage } from '../data';

const Skills = () => {
  return (
    <section className='skills-section' id='skills'>
      <h2 className='section-title'>Skills</h2>
      <span className='section-subtitle'>My tech stack</span>
      <div className='skills-container'>
        <div className='skills-container-box'>
          {skillsImage.map((skill) => {
            const { id, img, name } = skill;
            return (
              <div className='skills-image-box'>
                <img className='skill-img' key={id} src={img} alt={name} />
                <div className='skill-name'>{name}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;
