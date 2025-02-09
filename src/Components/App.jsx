import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './header.jsx';
import Footer from './Footer.jsx';
import Pet from './pet.jsx'
import Digital from './Digital.jsx';

import Home from '../Pages/Home.jsx';  
import About from '../Pages/About.jsx';  
import Contact from '../Pages/Contact.jsx';

function App() {      
  return (
    <Router>
  
      <Header />
      
      <Routes>
        
        <Route path="/" element={
          <>
            <Home />  
            <Digital />  
            <Pet />  
          </>
        } />

        <Route path="/about" element={<About />} />
        
        
        <Route path="/contact" element={<Contact />} />
      </Routes>

     
      <Footer />
    </Router>
  );
}

export default App;


