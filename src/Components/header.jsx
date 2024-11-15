import { Link } from 'react-router-dom'; 

function Header() {
  return (
    <header className="Header">
      <h1>Shopify</h1>
      <nav>
        <ul>
          
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>
        <hr />
      </nav>
    </header>
  );
}

export default Header;
