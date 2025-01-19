const Navbar = () => {
    return (
      <nav className="bg-black text-white py-4">
        <ul className="flex space-x-4 justify-center">
          <li><a href="/" className="hover:underline">Home</a></li>
          <li><a href="/featuressection" className="hover:underline">Features</a>
          </li>
        </ul>
      </nav>
    );
  };
  
  export default Navbar;
  