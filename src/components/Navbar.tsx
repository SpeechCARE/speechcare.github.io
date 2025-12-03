import { Link, useLocation } from "react-router-dom";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useTheme } from "next-themes";
import logo from "@/assets/logo.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch by only rendering after mount
  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted && resolvedTheme === "dark";

  const links = [
    { name: "Home", path: "/" },
    { name: "Projects", path: "/projects" },
    { name: "Publications", path: "/publications" },
    { name: "Awards", path: "/awards" },
    { name: "Members", path: "/members" },
    { name: "Join Us", path: "/join" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center">
              <img src={logo} alt="SpeechCARE Logo" className="w-10 h-10" />
            </div>
            <span className="font-heading font-bold text-2xl">SpeechCARE</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive(link.path)
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground hover:bg-muted"
                }`}
              >
                {link.name}
              </Link>
            ))}
            {/* Theme Toggle */}
            <div className="flex items-center space-x-2 ml-4 pl-4 border-l border-border">
              {mounted && (
                <>
                  <Sun className="h-4 w-4 text-foreground/70" />
                  <Switch
                    checked={isDark}
                    onCheckedChange={(checked) => {
                      setTheme(checked ? "dark" : "light");
                    }}
                  />
                  <Moon className="h-4 w-4 text-foreground/70" />
                </>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 space-y-2">
            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive(link.path)
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground hover:bg-muted"
                }`}
              >
                {link.name}
              </Link>
            ))}
            {/* Mobile Theme Toggle */}
            {mounted && (
              <div className="flex items-center justify-between px-4 py-2">
                <div className="flex items-center space-x-2">
                  <Sun className="h-4 w-4 text-foreground/70" />
                  <span className="text-sm font-medium text-foreground">Theme</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={isDark}
                    onCheckedChange={(checked) => {
                      setTheme(checked ? "dark" : "light");
                    }}
                  />
                  <Moon className="h-4 w-4 text-foreground/70" />
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
