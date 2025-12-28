import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { 
  LayoutDashboard, 
  Settings, 
  ChevronDown, 
  User, 
  LogOut, 
  Briefcase,
  PieChart,
  Layers,
  Search
} from 'lucide-react';

interface MenuItem {
  label: string;
  path: string;
  icon?: string;
}

interface MenuGroup {
  title: string;
  items: MenuItem[];
}

interface SidebarLayoutProps {
  menu_groups?: MenuGroup[]; // New grouped structure
  menu_items?: MenuItem[]; // Fallback for simple structure
  workspace_name?: string;
  children?: React.ReactNode;
}

const iconMap: Record<string, any> = {
  dashboard: LayoutDashboard,
  settings: Settings,
  briefcase: Briefcase,
  chart: PieChart,
  layers: Layers,
  default: LayoutDashboard
};

const SidebarLayout: React.FC<SidebarLayoutProps> = ({ 
  menu_groups, 
  menu_items,
  workspace_name = "Acme Corp",
  children 
}) => {
  const { session } = useAuth();
  const location = useLocation();
  const [activeWorkspace, setActiveWorkspace] = useState(workspace_name);

  // Normalize structure: If simple items provided, wrap in a "Main" group
  const groups = menu_groups || (menu_items ? [{ title: "Main Menu", items: menu_items }] : []);

  return (
    <div className="flex h-screen bg-base-100">
      {/* COMMAND CENTER SIDEBAR */}
      <aside className="w-64 bg-base-200/50 border-r border-base-content/10 hidden md:flex flex-col h-full sticky top-0">
        
        {/* 1. WORKSPACE SWITCHER */}
        <div className="p-4 border-b border-base-content/5">
          <div className="dropdown w-full">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-block justify-between no-animation hover:bg-base-300/50">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary text-primary-content flex items-center justify-center font-bold text-lg">
                  {activeWorkspace.charAt(0)}
                </div>
                <div className="flex flex-col items-start text-xs">
                  <span className="opacity-50 font-medium uppercase tracking-wider">Workspace</span>
                  <span className="font-bold text-sm truncate max-w-[100px]">{activeWorkspace}</span>
                </div>
              </div>
              <ChevronDown size={16} className="opacity-50" />
            </div>
            <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow-xl bg-base-100 rounded-box w-56 mt-2 border border-base-content/10">
              <li className="menu-title">Switch Workspace</li>
              <li><a onClick={() => setActiveWorkspace("Acme Corp")}>Acme Corp</a></li>
              <li><a onClick={() => setActiveWorkspace("Personal")}>Personal Project</a></li>
              <li className="mt-2 border-t border-base-content/5 pt-2"><a className="text-primary">+ Create New</a></li>
            </ul>
          </div>
        </div>

        {/* 2. SEARCH (Optional visual cue) */}
        <div className="px-4 py-2">
            <label className="input input-sm input-bordered flex items-center gap-2 bg-base-100/50">
                <Search size={14} className="opacity-50" />
                <input type="text" className="grow" placeholder="Quick find..." />
                <kbd className="kbd kbd-sm h-5 text-[10px]">⌘K</kbd>
            </label>
        </div>
        
        {/* 3. SCROLLABLE MENU GROUPS */}
        <nav className="flex-1 overflow-y-auto px-2 py-4 space-y-6">
          {groups.map((group, idx) => (
            <div key={idx}>
              <div className="px-4 mb-2 text-xs font-bold uppercase tracking-wider opacity-40">
                {group.title}
              </div>
              <ul className="menu menu-sm w-full p-0">
                {group.items.map((item, itemIdx) => {
                  const Icon = iconMap[item.icon || 'default'] || iconMap.default;
                  const isActive = location.pathname === item.path;
                  
                  return (
                    <li key={itemIdx}>
                      <Link 
                        to={item.path}
                        className={isActive ? 'active bg-primary/10 text-primary font-medium border-l-4 border-primary rounded-r-lg rounded-l-none' : 'border-l-4 border-transparent'}
                      >
                        <Icon size={18} />
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>

        {/* 4. USER FOOTER SLOT */}
        <div className="p-4 border-t border-base-content/5 bg-base-100/50 backdrop-blur-sm">
            {session ? (
                 <div className="flex items-center gap-3 hover:bg-base-200 p-2 rounded-lg cursor-pointer transition-colors group">
                    <div className="avatar online placeholder">
                        <div className="bg-neutral text-neutral-content rounded-full w-9">
                            <span className="text-xs">{session.user.email?.charAt(0).toUpperCase()}</span>
                        </div>
                    </div>
                    <div className="flex flex-col overflow-hidden">
                        <span className="text-sm font-semibold truncate group-hover:text-primary transition-colors">
                            {session.user.email?.split('@')[0]}
                        </span>
                        <span className="text-[10px] opacity-50 truncate">{session.user.email}</span>
                    </div>
                    <Settings size={16} className="ml-auto opacity-0 group-hover:opacity-50 transition-opacity" />
                 </div>
            ) : (
                <Link to="/login" className="btn btn-sm btn-ghost w-full justify-start gap-3">
                    <LogOut size={16} />
                    <span>Sign In</span>
                </Link>
            )}
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 overflow-auto bg-base-100 relative">
        <div className="w-full max-w-7xl mx-auto p-4 md:p-8">
             {children}
        </div>
      </main>
    </div>
  );
};

export default SidebarLayout;