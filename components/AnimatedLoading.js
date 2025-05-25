import React from 'react';

const AnimatedLoader = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-50">
      <div className="flex flex-col items-center space-y-6">
        {/* Three dot loader with tilted animation */}
        <div className="flex space-x-4 transform ">
          <div 
            className="w-6 h-6 bg-blue-600 rounded-full animate-bounce"
            style={{
              animationDelay: '0ms',
              animationDuration: '1.4s'
            }}
          ></div>
          <div 
            className="w-6 h-6 bg-blue-500 rounded-full animate-bounce"
            style={{
              animationDelay: '160ms',
              animationDuration: '1.4s'
            }}
          ></div>
          <div 
            className="w-6 h-6 bg-blue-400 rounded-full animate-bounce"
            style={{
              animationDelay: '320ms',
              animationDuration: '1.4s'
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default AnimatedLoader;