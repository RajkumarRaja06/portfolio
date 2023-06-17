import Title from './Title';
import '../style/about.css';

const About = () => {
  return (
    <div className='about-container' id='about'>
      <Title name={'About Me'} subtitle={'My Introduction'} />
      <p className='about-desc'>
        I have completed my engineering at the Knowledge Institute of Technology
        and am an aspiring Full stack Web developer. I have a deep understanding
        of various web technologies such as{' '}
        <b>HTML, CSS, JavaScript, TypeScript, Node.js, and React</b>. I am
        dedicated to keeping up with the latest trends and techniques in web
        development, and I am constantly learning and expanding my skill set. I
        have a keen eye for detail and strive for perfection in every project I
        work on. When I'm not coding, I enjoy exploring new technologies and
        working on side projects. I am a sports enthusiast. I play cricket and
        go to practice regularly. I am also a big cricket fan and my favorite
        club is India.
      </p>
    </div>
  );
};

export default About;
