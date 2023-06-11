import '../style/index.css';
import '../style/skills.css';
import { skillsImage } from '../data';
import Title from './Title';

const Skills = () => {
  return (
    <section className='skills-section' id='skills'>
      <Title name='Skills' subtitle='My tech stack' />
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
