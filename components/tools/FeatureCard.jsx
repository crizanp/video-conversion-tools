import React from "react";

const FeatureCard = ({ icon, title, description }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-8 transition-transform hover:-translate-y-2">
      <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-full flex items-center justify-center">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-gray-800 mb-3">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default FeatureCard;
