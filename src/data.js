import { BiHome } from 'react-icons/bi';
import { RxPerson } from 'react-icons/rx';
import { CgFileDocument, CgList } from 'react-icons/cg';
import { RiSendPlaneFill } from 'react-icons/ri';
import { FiGithub } from 'react-icons/fi';
import { SlSocialLinkedin } from 'react-icons/sl';

export const navBarList = [
  {
    id: 1,
    icon: <BiHome />,
    iconName: 'Home',
    link: '#home',
  },
  {
    id: 2,
    icon: <RxPerson />,
    iconName: 'About',
  },
  {
    id: 3,
    icon: <CgFileDocument />,
    iconName: 'Skill',
  },
  {
    id: 4,
    icon: <CgList />,
    iconName: 'Project',
  },
  {
    id: 5,
    icon: <RiSendPlaneFill />,
    iconName: 'Contact Me',
  },
];

export const socialMediaIcon = [<FiGithub />, <SlSocialLinkedin />];
