import React, { useState } from 'react';

const AuthCard = () => {
  const [activeTab, setActiveTab] = useState('login');
  const [isVisible, setIsVisible] = useState(false);
  
  const toggleCard = () => {
    setIsVisible(!isVisible);
  };
  
  const closeCard = () => {
    setIsVisible(false);
  };
  
  return (
    <div className="relative">
      {/* Toggle Buttons */}
      <div className="fixed bottom-4 right-4 z-10">
        <button 
          onClick={toggleCard} 
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-full shadow-lg"
        >
          {isVisible ? 'Close' : 'Login / Sign Up'}
        </button>
      </div>
      
      {/* Floating Card */}
      {isVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 overflow-hidden">
            {/* Close Button */}
            <button 
              onClick={closeCard}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
            
            {/* Tab Navigation */}
            <div className="flex border-b">
              <button 
                className={"flex-1 py-4 text-center font-medium ${activeTab === 'login' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}"}
                onClick={() => setActiveTab('login')}
              >
                Login
              </button>
              <button 
                className={"flex-1 py-4 text-center font-medium ${activeTab === 'signup' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}"}
                onClick={() => setActiveTab('signup')}
              >
                Sign Up
              </button>
            </div>
            
            {/* Card Content */}
            <div className="p-6">
              <div className="flex flex-col md:flex-row">
                {/* Login Form */}
                {activeTab === 'login' && (
                  <div className="w-full p-4">
                    <h2 className="text-2xl font-bold mb-6">Login</h2>
                    <form>
                      <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Email / Phone</label>
                        <input 
                          type="text" 
                          placeholder="Enter email or phone" 
                          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Password</label>
                        <input 
                          type="password" 
                          placeholder="Enter password" 
                          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div className="mb-6">
                        <a href="#" className="text-blue-600 hover:underline">Forgot Password?</a>
                      </div>
                      <button 
                        type="submit" 
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md"
                      >
                        Login
                      </button>
                      <div className="mt-4 space-y-2">
                        <button 
                          type="button" 
                          className="w-full border border-gray-300 py-2 px-4 rounded-md flex items-center justify-center gap-2"
                        >
                          <span className="flex items-center justify-center">
                            <svg width="18" height="18" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                            </svg>
                          </span>
                          <span>Login with Google</span>
                        </button>
                        <button 
                          type="button" 
                          className="w-full border border-gray-300 py-2 px-4 rounded-md flex items-center justify-center gap-2"
                        >
                          <span className="flex items-center justify-center">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <rect width="24" height="24" rx="4" fill="#2A6BB5"/>
                              <path d="M17.94 12.12c0-.82.07-1.33.07-1.33H6v2.88h7.13c-.29.93-.82 1.73-1.75 2.26v1.88h2.84c1.66-1.53 2.72-3.78 2.72-5.69z" fill="#FFFFFF"/>
                            </svg>
                          </span>
                          <span>Login with Aadhaar</span>
                        </button>
                      </div>
                    </form>
                  </div>
                )}
                
                {/* Signup Form */}
                {activeTab === 'signup' && (
                  <div className="w-full p-4">
                    <h2 className="text-2xl font-bold mb-6">Sign Up</h2>
                    <form>
                      <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Full Name</label>
                        <input 
                          type="text" 
                          placeholder="Enter full name" 
                          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Email / Phone</label>
                        <input 
                          type="text" 
                          placeholder="Enter email or phone" 
                          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Password</label>
                        <input 
                          type="password" 
                          placeholder="Create password" 
                          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Confirm Password</label>
                        <input 
                          type="password" 
                          placeholder="Confirm password" 
                          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Select Role</label>
                        <select className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                          <option>Citizen</option>
                          <option>Business</option>
                          <option>Government</option>
                        </select>
                      </div>
                      <button 
                        type="submit" 
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md"
                      >
                        Sign Up
                      </button>
                    </form>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AuthCard;