import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Digital from './Digital.jsx';
import Header from './header.jsx'
import Footer from "./Footer.jsx"
import Shop from "./Shop.jsx"

import Home from '../Pages/Home.jsx';  
import About from '../Pages/About.jsx';  
import Contact from '../Pages/Contact.jsx';


function App() {      
  return (
    <>
     <Router>
  
  <Header />
  
  <Routes>
    
    <Route path="/" element={
      <>
        <Home />  
        <Digital />  
        <Shop/>  
      </>
    } />

    <Route path="/about" element={<About />} />
    
    
    <Route path="/contact" element={<Contact />} />
  </Routes>

 
  <Footer />
</Router>


   </>
  
  );
}

export default App;

