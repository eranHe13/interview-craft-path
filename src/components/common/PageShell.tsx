import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, LayoutDashboard, Library, BarChart3, Info, Moon, Sun } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";

interface PageShellProps {
  children: ReactNode;
  title?: string;
  breadcrumbs?: Array<{ label: string; href?: string }>;
}

export function PageShell({ children, title, breadcrumbs }: PageShellProps) {
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  const navItems = [
    { icon: Home, label: "Home", href: "/" },
    { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
    { icon: Library, label: "Question Bank", href: "/bank" },
    { icon: BarChart3, label: "Analytics", href: "/analytics" },
    { icon: Info, label: "About", href: "/about" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
                <span className="text-white font-bold text-lg">C</span>
              </div>
              <span className="font-bold text-xl">CodeMaster</span>
            </Link>

            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.href;
                return (
                  <Link key={item.href} to={item.href}>
                    <Button
                      variant={isActive ? "secondary" : "ghost"}
                      size="sm"
                      className="gap-2"
                    >
                      <Icon className="w-4 h-4" />
                      {item.label}
                    </Button>
                  </Link>
                );
              })}
            </nav>
          </div>

          <Button variant="ghost" size="icon" onClick={toggleTheme}>
            {theme === "dark" ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </Button>
        </div>
      </header>

      {(title || breadcrumbs) && (
        <div className="border-b bg-muted/30">
          <div className="container mx-auto px-4 py-4">
            {breadcrumbs && breadcrumbs.length > 0 && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                {breadcrumbs.map((crumb, index) => (
                  <div key={index} className="flex items-center gap-2">
                    {index > 0 && <span>/</span>}
                    {crumb.href ? (
                      <Link to={crumb.href} className="hover:text-foreground transition-colors">
                        {crumb.label}
                      </Link>
                    ) : (
                      <span className="text-foreground">{crumb.label}</span>
                    )}
                  </div>
                ))}
              </div>
            )}
            {title && <h1 className="text-3xl font-bold">{title}</h1>}
          </div>
        </div>
      )}

      <main className="container mx-auto px-4 py-8">{children}</main>
    </div>
  );
}
