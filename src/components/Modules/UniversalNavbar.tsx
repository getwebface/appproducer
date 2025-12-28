import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface NavLink {
  label: string;
  path: string;
}

interface UniversalNavbarProps {
  logo_url?: string;
  links: NavLink[];
  cta_button?: string;
  login_path?: string;
}

const UniversalNavbar: React.FC<UniversalNavbarProps> = ({ 
  logo_url, 
  links = [], 
  cta_button = "Login",
  login_path = "/login"
}) => {
  const { session } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="navbar bg-base-100 shadow-sm sticky top-0 z-50">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </label>
          {isMenuOpen && (
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
              {links.map((link, idx) => (
                <li key={idx}><Link to={link.path} onClick={() => setIsMenuOpen(false)}>{link.label}</Link></li>
              ))}
            </ul>
          )}
        </div>
        <Link to="/" className="btn btn-ghost normal-case text-xl">
          {logo_url ? (
            <img className="h-8 w-auto" src={logo_url} alt="Logo" />
          ) : (
            <span className="text-primary">App</span>
          )}
        </Link>
      </div>
      
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {links.map((link, idx) => (
            <li key={idx}><Link to={link.path}>{link.label}</Link></li>
          ))}
        </ul>
      </div>
      
      <div className="navbar-end">
        {session ? (
          <Link to="/profile" className="btn btn-primary">Profile</Link>
        ) : (
          <Link to={login_path} className="btn btn-primary">{cta_button}</Link>
        )}
      </div>
    </div>
  );
};

export default UniversalNavbar;
