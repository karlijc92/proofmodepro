import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, User } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { initMemberstack, memberstack } from '@/lib/memberstack';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentMember, setCurrentMember] = useState(null);
  const location = useLocation();

  useEffect(() => {
    initMemberstack();
    checkAuthStatus();
  }, [location]);

  const checkAuthStatus = async () => {
    try {
      const member = await memberstack.getCurrentMember();
      if (member) {
        setIsLoggedIn(true);
        setCurrentMember(member);
        localStorage.setItem('isLoggedIn', 'true');
      } else {
        setIsLoggedIn(false);
        setCurrentMember(null);
        localStorage.removeItem('isLoggedIn');
      }
    } catch (error) {
      console.error('Auth check error:', error);
      setIsLoggedIn(false);
    }
  };

  const handleLogout = async () => {
    try {
      const result = await memberstack.logout();
      if (result.success) {
        setIsLoggedIn(false);
        setCurrentMember(null);
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('userData');
        localStorage.removeItem('memberData');
        window.location.href = '/';
      }
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">PM</span>
            </div>
            <span className="font-bold text-xl text-gray-900">ProofModePro</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/create-trust-tag" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              Create TrustTag
            </Link>
            <Link to="/verify" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              Verify
            </Link>
            <Link to="/partnership" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              Partners
            </Link>
            
            {/* Auth Buttons */}
            <div className="flex items-center space-x-4">
              {!isLoggedIn ? (
                <>
                  <Link to="/login">
                    <Button variant="ghost" className="text-gray-700 hover:text-blue-600">
                      Login
                    </Button>
                  </Link>
                  <Link to="/signup">
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                      Sign Up
                    </Button>
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/profile">
                    <Button variant="ghost" className="text-gray-700 hover:text-blue-600">
                      <User className="w-4 h-4 mr-2" />
                      Profile
                    </Button>
                  </Link>
                  <Button 
                    variant="outline"
                    onClick={handleLogout}
                    className="text-gray-700 hover:text-red-600 border-gray-300"
                  >
                    Logout
                  </Button>
                </>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-4">
              <Link 
                to="/create-trust-tag" 
                className="text-gray-700 hover:text-blue-600 font-medium"
                onClick={() => setIsOpen(false)}
              >
                Create TrustTag
              </Link>
              <Link 
                to="/verify" 
                className="text-gray-700 hover:text-blue-600 font-medium"
                onClick={() => setIsOpen(false)}
              >
                Verify
              </Link>
              <Link 
                to="/partnership" 
                className="text-gray-700 hover:text-blue-600 font-medium"
                onClick={() => setIsOpen(false)}
              >
                Partners
              </Link>
              
              <div className="pt-4 border-t border-gray-200">
                {!isLoggedIn ? (
                  <div className="flex flex-col space-y-2">
                    <Link to="/login" onClick={() => setIsOpen(false)}>
                      <Button variant="ghost" className="justify-start w-full">
                        Login
                      </Button>
                    </Link>
                    <Link to="/signup" onClick={() => setIsOpen(false)}>
                      <Button className="bg-blue-600 hover:bg-blue-700 text-white justify-start w-full">
                        Sign Up
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <div className="flex flex-col space-y-2">
                    <Link to="/profile" onClick={() => setIsOpen(false)}>
                      <Button variant="ghost" className="justify-start w-full">
                        <User className="w-4 h-4 mr-2" />
                        Profile
                      </Button>
                    </Link>
                    <Button 
                      variant="outline"
                      onClick={handleLogout}
                      className="justify-start w-full text-red-600 border-red-300"
                    >
                      Logout
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}