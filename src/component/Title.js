import '../style/index.css';

const Title = (props) => {
  return (
    <div className='title-container'>
      <h2 className='title-name'>{props.name}</h2>
      <span className='title-subtitle'>{props.subtitle}</span>
    </div>
  );
};

export default Title;
