import Navbar from './component/Navbar';
import Home from './component/Home';
import About from './component/About';
import Skills from './component/Skills';
import Portfolio from './component/Portfolio';
import Contact from './component/Contact';
import Footer from './component/Footer';

const App = () => {
  return (
    <main className='main'>
      <Navbar />
      <Home />
      <About />
      <Skills />
      <Portfolio />
      <Contact />
      <Footer />
    </main>
  );
};

export default App;
