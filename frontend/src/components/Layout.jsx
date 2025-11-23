import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  BookOpen,
  Layers,
  Users,
  GraduationCap,
  LineChart,
  Shield,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

export default function Layout({ children }) {
  const location = useLocation();
  const [collapsed, setCollapsed] = React.useState(false);

  React.useEffect(() => {
    const saved = localStorage.getItem('sidebarCollapsed');
    if (saved) setCollapsed(saved === '1');
  }, []);

  const toggleCollapsed = () => {
    setCollapsed((c) => {
      const next = !c;
      localStorage.setItem('sidebarCollapsed', next ? '1' : '0');
      return next;
    });
  };

  const navItems = [
    { to: '/', label: 'Dashboard', Icon: LayoutDashboard },
    { to: '/cursos', label: 'Cursos', Icon: BookOpen },
    { to: '/trilhas', label: 'Trilhas', Icon: Layers },
    { to: '/colaboradores', label: 'Colaboradores', Icon: Users },
    { to: '/meus-cursos', label: 'Meus Cursos', Icon: GraduationCap },
    { to: '/relatorios', label: 'Relatórios', Icon: LineChart },
    { to: '/regras', label: 'Regras', Icon: Shield }
  ];

  const padClass = collapsed ? 'md:pl-20' : 'md:pl-64';

  const NavLink = ({ to, label, Icon }) => {
    const active = location.pathname === to;
    return (
      <Link
        to={to}
        title={label}
        className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors ${
          active ? 'bg-green-600 text-white' : 'text-gray-700 hover:bg-gray-100'
        }`}
      >
        <Icon className="w-5 h-5 shrink-0" />
        <span
          className={`whitespace-nowrap transition-opacity ${
            collapsed ? 'opacity-0 pointer-events-none select-none' : 'opacity-100'
          }`}
        >
          {label}
        </span>
      </Link>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar (desktop) */}
      <aside
        className={`hidden md:flex md:flex-col md:fixed md:inset-y-0 bg-white border-r transition-all duration-200 ${
          collapsed ? 'md:w-20' : 'md:w-64'
        }`}
      >
        <div className="px-3 py-3 flex items-center justify-between">
          <div className={`text-lg font-bold text-green-700 ${collapsed ? 'opacity-0' : 'opacity-100'} transition-opacity`}>
            App
          </div>
          <button
            aria-label="Alternar sidebar"
            onClick={toggleCollapsed}
            className="p-2 rounded hover:bg-gray-100 text-gray-700"
            title={collapsed ? 'Expandir' : 'Recolher'}
          >
            {collapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
          </button>
        </div>
        <nav className="flex-1 px-2 space-y-1">
          {navItems.map((it) => (
            <NavLink key={it.to} to={it.to} label={it.label} Icon={it.Icon} />
          ))}
        </nav>
      </aside>

      {/* Content area with left padding when sidebar is visible */}
      <div className={`${padClass} flex flex-col min-h-screen`}>
        {/* Top bar (mobile only) */}
        <header className="md:hidden bg-white border-b">
          <div className="px-4 py-3 flex items-center gap-3 overflow-x-auto">
            <div className="font-bold text-green-700">App</div>
            <nav className="flex gap-2">
              {navItems.map((it) => (
                <Link key={it.to} to={it.to} className={`px-3 py-2 rounded ${location.pathname === it.to ? 'bg-green-600 text-white' : 'text-gray-700 hover:bg-gray-100'}`}>
                  {it.label}
                </Link>
              ))}
            </nav>
          </div>
        </header>

        <main className="flex-1 px-4 py-6">{children}</main>
      </div>
    </div>
  );
}
