import React from "react";

const FeaturesSection = ({ title, description, features }) => {
  return (
    <section className="py-10" id="features">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 mb-6">
          {title}
        </h2>
        <p className="text-lg md:text-xl text-gray-600 mb-16">
          {description}
        </p>

        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-2xl p-8 transition-transform hover:-translate-y-2"
            >
              <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-full flex items-center justify-center">
                {typeof feature.icon === "string" ? (
                  <img src={feature.icon} alt="icon" className="w-8 h-8" />
                ) : (
                  feature.icon
                )}
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
