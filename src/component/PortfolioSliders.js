// import '../style/skills.css';
// import '../style/portfolio.css';
// import { BsBoxArrowUpRight } from 'react-icons/bs';
// import { FiGithub } from 'react-icons/fi';
// import { portfolioSliders } from '../data';
// import { useState } from 'react';

// const PortfolioSliders = () => {

//   return (
//     <>
//       {users.map((user, position) => {
//         const { id, name, img, code, demo, description } = user;
//         let placement = 'nextSlide';
//         if (position === index) {
//           placement = 'activeSlide';
//         } else if (position === index - 1) {
//           placement = 'prevSlide';
//         }
//         return (
//           <article id='portfolio-content' className={placement} key={id}>
//             <div className='portfolio-image'>
//               <img src={img} alt={name} />
//             </div>
//             <div className='portfolio-project-data'>
//               <div className='portfolio-project-name'>{name}</div>
//               <div className='portfolio-project-description'>{description}</div>
//               <div className='portfolio-project-btn'>
//                 <button className='portfolio-project-github-btn'>
//                   <a href={code}>
//                     <FiGithub />
//                   </a>
//                 </button>
//                 <button className='portfolio-project-host-btn'>
//                   <a href={demo}>
//                     <BsBoxArrowUpRight />
//                   </a>
//                 </button>
//               </div>
//             </div>
//           </article>
//         );
//       })}
//     </>
//   );
// };

// export default PortfolioSliders;
