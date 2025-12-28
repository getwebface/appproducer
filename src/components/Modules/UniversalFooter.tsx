import React from 'react';
import { Link } from 'react-router-dom';

interface FooterLink {
  label: string;
  path: string;
}

interface FooterColumn {
  title: string;
  links: FooterLink[];
}

interface UniversalFooterProps {
  columns: FooterColumn[];
  copyright_text?: string;
}

const UniversalFooter: React.FC<UniversalFooterProps> = ({ 
  columns = [], 
  copyright_text = "© 2024 Universal App. All rights reserved." 
}) => {
  return (
    <footer className="footer p-10 bg-neutral text-neutral-content">
      {columns.map((col, idx) => (
        <nav key={idx}>
          <header className="footer-title">{col.title}</header> 
          {col.links.map((link, linkIdx) => (
            <Link key={linkIdx} to={link.path} className="link link-hover">
              {link.label}
            </Link>
          ))}
        </nav>
      ))}
      <aside className="footer-center w-full mt-4">
         <p>{copyright_text}</p>
      </aside>
    </footer>
  );
};

export default UniversalFooter;
