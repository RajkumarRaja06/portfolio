import { BiHome } from 'react-icons/bi';
import { RxPerson } from 'react-icons/rx';
import { CgFileDocument, CgList } from 'react-icons/cg';
import { RiSendPlaneFill } from 'react-icons/ri';
import { FiGithub } from 'react-icons/fi';
import { SlSocialLinkedin } from 'react-icons/sl';
import html from './image/html.svg';
import css from './image/css.svg';
import javaScript from './image/javascript.svg';
import react from './image/react.svg';
import nodejs from './image/nodejs.png';
import bootStrap from './image/bootstrap.png';

export const navbarList = [
  {
    id: 1,
    icon: <BiHome />,
    name: 'Home',
    link: '#home',
  },
  {
    id: 2,
    icon: <RxPerson />,
    name: 'About',
  },
  {
    id: 3,
    icon: <CgFileDocument />,
    name: 'Skill',
  },
  {
    id: 4,
    icon: <CgList />,
    name: 'Project',
  },
  {
    id: 5,
    icon: <RiSendPlaneFill />,
    name: 'Contact Me',
  },
];

export const socialMediaIcon = [<FiGithub />, <SlSocialLinkedin />];

export const skillsImage = [
  { id: 1, img: html, name: 'html' },
  { id: 2, img: css, name: 'css' },
  { id: 3, img: javaScript, name: 'javascript' },
  { id: 4, img: react, name: 'react js' },
  { id: 5, img: nodejs, name: 'node js' },
  { id: 6, img: bootStrap, name: 'bootstrap' },
];
