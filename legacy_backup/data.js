import { BiHome } from 'react-icons/bi';
import { RxPerson } from 'react-icons/rx';
import { CgFileDocument, CgList } from 'react-icons/cg';
import { RiSendPlaneFill } from 'react-icons/ri';
import { FiGithub } from 'react-icons/fi';
import { SlSocialLinkedin } from 'react-icons/sl';
import { TbBrandBlogger } from 'react-icons/tb';

import html from './images/html.svg';
import css from './images/css.svg';
import javaScript from './images/javascript.svg';
import react from './images/react.svg';
import nodejs from './images/nodejs.svg';
import bootStrap from './images/bootstrap.png';

import currencyConvertor from './images/project-1.png';
import rockPaperSizzlers from './images/project-2.png';
import ticTacToe from './images/project-3.png';
import todo from './images/project-4.png';
import countTownTimer from './images/project-5.png';
import pigGame from './images/project-6.png';
import dragAndDrop from './images/project-7.png';
import analogClock from './images/project-8.png';
import registrationForm from './images/project-9.png';
import expenseTracker from './images/project-10.png';
import quizApp from './images/project-11.png';
import resumeBuilder from './images/project-12.png';
import bookmarker from './images/project-13.png';
import resumeBuilder1 from './images/project-14.png';
import countriesFlag from './images/project-15.png';

import eCommerce from './images/react1.png';
import food from './images/react2.png';
import blog from './images/react3.png';

export const navbarList = [
  {
    id: 1,
    icon: <BiHome />,
    name: 'Home',
    href: 'home',
    offset: 0,
  },
  {
    id: 2,
    icon: <RxPerson />,
    name: 'About',
    href: 'about',
    offset: 0,
  },
  {
    id: 3,
    icon: <CgFileDocument />,
    name: 'Skills',
    href: 'skills',
    offset: -7,
  },
  {
    id: 4,
    icon: <CgList />,
    name: 'Portfolio',
    href: 'portfolio',
    offset: -75,
  },
  {
    id: 5,
    icon: <RiSendPlaneFill />,
    name: 'Contact Me',
    href: 'contact',
    offset: -50,
  },
  {
    id: 6,
    icon: <TbBrandBlogger />,
    name: 'Blog',
    href: 'blog',
    offset: 50,
  },
];

export const socialMediaIcon = [
  {
    id: 1,
    icon: <FiGithub />,
    link: 'https://github.com/RajkumarRaja06',
  },
  {
    id: 2,
    icon: <SlSocialLinkedin />,
    link: 'https://www.linkedin.com/in/rajkumarraja06/',
  },
];

export const skillsImage = [
  { id: 1, img: html, name: 'html' },
  { id: 2, img: css, name: 'css' },
  { id: 3, img: javaScript, name: 'javascript' },
  { id: 4, img: react, name: 'react js' },
  { id: 5, img: nodejs, name: 'node js' },
  { id: 6, img: bootStrap, name: 'bootstrap 5' },
];

export const portfolioSliders = [
  {
    id: 1,
    name: 'Currency Convertor',
    description:
      'HTML, CSS, and JavaScript combine to create a currency converter that dynamically converts values based on selected currencies.',
    img: currencyConvertor,
    code: 'https://github.com/RajkumarRaja06/rate-calculator.github.io',
    demo: 'https://rajkumarraja06.github.io/rate-calculator.github.io/',
  },
  {
    id: 2,
    name: 'Rock Paper Sizzlers',
    description:
      'Using HTML, CSS, and JavaScript, create a Rock Paper Scissors Lizard Spock game with rules and a scoring system.',
    img: rockPaperSizzlers,
    code: 'https://github.com/RajkumarRaja06/rock-paper-scissors-master.github.io',
    demo: 'https://rajkumarraja06.github.io/rock-paper-scissors-master.github.io/',
  },
  {
    id: 3,
    name: 'Tic Tac Toe',
    description:
      'Using HTML, CSS, and JavaScript, create a Tic Tac Toe game with a grid, player turns, win conditions, and a restart option.',
    img: ticTacToe,
    code: 'https://github.com/RajkumarRaja06/tic-tac-toe-game.github.io',
    demo: 'https://rajkumarraja06.github.io/tic-tac-toe-game.github.io/',
  },
  {
    id: 4,
    name: 'Todo App',
    description:
      'Create a todo list using HTML, CSS, and JavaScript, allowing users to add, remove, and mark tasks as completed.',
    img: todo,
    code: 'https://rajkumarraja06.github.io/to-do-app.github.io/',
    demo: 'https://github.com/RajkumarRaja06/to-do-app.github.io',
  },
  {
    id: 5,
    name: 'Launch CountTown Timer',
    description:
      'Design and implement a CountDown Timer using HTML, CSS, and JavaScript to track and display the time remaining until a specified event.',
    img: countTownTimer,
    code: 'https://github.com/RajkumarRaja06/launch-countdown-timer-main.github.io',
    demo: 'https://rajkumarraja06.github.io/launch-countdown-timer-main.github.io/',
  },
  {
    id: 6,
    name: 'Pig Game',
    description:
      'Implement a Pig Game using HTML, CSS, and JavaScript, where players take turns rolling dice to accumulate points and reach a target score.',
    img: pigGame,
    code: 'https://github.com/RajkumarRaja06/pig-game-main.github.io',
    demo: 'https://rajkumarraja06.github.io/pig-game-main.github.io/',
  },
  {
    id: 7,
    name: 'Drag And Drop',
    description:
      'Create a drag and drop feature using HTML, CSS, and JavaScript, allowing users to drag elements and drop them into designated areas.',
    img: dragAndDrop,
    code: 'https://github.com/RajkumarRaja06/drag-and-drop.github.io',
    demo: 'https://rajkumarraja06.github.io/drag-and-drop.github.io/',
  },
  {
    id: 8,
    name: 'Analog Clock',
    description:
      'Develop an analog clock using HTML, CSS, and JavaScript to display the current time with hour, minute, and second hands.',
    img: analogClock,
    code: 'https://github.com/RajkumarRaja06/analog-clock.github.io',
    demo: 'https://rajkumarraja06.github.io/analog-clock.github.io/',
  },
  {
    id: 9,
    name: 'Registration Form',
    description:
      'Design and implement a registration form using HTML, CSS, and JavaScript, allowing users to input and submit their information.',
    img: registrationForm,
    code: 'https://github.com/RajkumarRaja06/registration-form-client-side.github.io',
    demo: 'https://rajkumarraja06.github.io/registration-form-client-side.github.io/',
  },
  {
    id: 10,
    name: 'Expense Tracker',
    description:
      'Develop an expense tracker using HTML, CSS, and JavaScript, enabling users to log and categorize their expenses, track spending, and view summaries.',
    img: expenseTracker,
    code: 'https://rajkumarraja06.github.io/expense-tracker.github.io/',
    demo: 'https://github.com/RajkumarRaja06/expense-tracker.github.io',
  },
  {
    id: 11,
    name: 'Quiz App',
    description:
      'HTML, CSS, and JavaScript combine to create a quiz app that dynamically converts values based on selected currencies.',
    img: quizApp,
    code: 'https://github.com/RajkumarRaja06/quiz-app.github.io',
    demo: 'https://rajkumarraja06.github.io/quiz-app.github.io/',
  },
  {
    id: 12,
    name: 'Basic Resume Builder',
    description:
      'Using HTML, CSS, and JavaScript, create Resume Builder Application',
    img: resumeBuilder,
    code: 'https://github.com/RajkumarRaja06/basic-resume-builder',
    demo: 'https://rajkumarraja06.github.io/basic-resume-builder/',
  },
  {
    id: 13,
    name: 'Bookmarker',
    description:
      'Using HTML, CSS, and JavaScript, create a site bookmarker and also added a search feature.',
    img: bookmarker,
    code: 'https://github.com/RajkumarRaja06/bookmark',
    demo: 'https://lovely-cheesecake-e3de37.netlify.app/',
  },
  {
    id: 14,
    name: 'Resume Builder',
    description:
      'Using HTML, CSS, and JavaScript, create Resume Builder Application',
    img: resumeBuilder1,
    code: 'https://github.com/RajkumarRaja06/resume-builder.github.io',
    demo: 'https://rajkumarraja06.github.io/resume-builder.github.io/',
  },
  {
    id: 15,
    name: 'Countries Flag',
    description:
      'Design and implement a Countries Flag using HTML, CSS, and JavaScript to add flags dynamically and remove features ',
    img: countriesFlag,
    code: 'https://github.com/RajkumarRaja06/countries-flag',
    demo: 'https://rajkumarraja06.github.io/countries-flag/',
  },
];

export const portfolioSliders1 = [
  {
    id: 1,
    name: 'Food Delivery App',
    description:
      'Developed QUICKEAT , a fully responsive food delivery app using React.js, HTML, CSS, JavaScript, Firebase, useContext and useReducer hooks for optimized state management',
    img: food,
    code: 'https://github.com/RajkumarRaja06/food-delivery-app',
    demo: 'https://rajkumarraja-food-delivery-app.netlify.app/',
  },
  {
    id: 2,
    name: 'Blog Post',
    description:
      'A full-stack blog web application that incorporates user authentication, allowing users to create, edit, and delete their own posts.',
    img: blog,
    code: 'https://github.com/RajkumarRaja06/react-blog',
    demo: 'https://rajkumarraja-blog.netlify.app/',
  },
  {
    id: 3,
    name: 'E Commerce',
    description:
      'Developed a responsive e-commerce app called Dress Shop using HTML, CSS, JavaScript, ReactJS and filtering functionality using the useContext',
    img: eCommerce,
    code: 'https://github.com/RajkumarRaja06/e-commerce',
    demo: 'https://rajkumarraja-e-commerce.netlify.app/',
  },
];

export const footerLinks = [
  {
    name: 'Skills',
    href: '#skills',
  },
  {
    name: 'Portfolio',
    href: '#portfolio',
  },
  {
    name: 'Connect Me',
    href: '#connect',
  },
];
