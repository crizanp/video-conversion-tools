import React, { useState } from 'react';
import { Plus, Minus, HelpCircle } from 'lucide-react';

// Individual FAQ item component
const FAQItem = ({ question, answer, isOpen, toggleOpen }) => {
    return (
        <div className="border-b border-gray-200 py-5">
            <button
                onClick={toggleOpen}
                className="flex w-full justify-between items-center focus:outline-none"
            >
                <h3 className="text-lg font-medium text-gray-900">{question}</h3>
                <span className="ml-6 flex-shrink-0">
                    {isOpen ? (
                        <Minus className="h-5 w-5 text-blue-500" />
                    ) : (
                        <Plus className="h-5 w-5 text-blue-500" />
                    )}
                </span>
            </button>
            {isOpen && (
                <div className="mt-4 pr-12">
                    <p className="text-base text-gray-700">{answer}</p>
                </div>
            )}
        </div>
    );
};

// Main FAQ component
const FAQ = ({ title, faqs, icon }) => {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    // Use the icon provided via props, or default to HelpCircle
    const IconComponent = icon || <HelpCircle className="h-6 w-6 text-blue-500" />;

    return (
        <div id="faq" className="bg-white py-12 md:py-16 lg:py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row">
                    {/* Left side - Icon */}
                    <div className="hidden md:flex md:w-1/4 justify-center items-center my-auto">
                        <div className="flex-shrink-0 bg-blue-100 rounded-full p-4 w-16 h-16 flex items-center justify-center">
                            {IconComponent}
                        </div>
                    </div>

                    <div className="md:w-3/4 flex items-center">
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-800">FAQ</h1>
                    </div>
                    {/* Right side - FAQ content */}
                    <div className="md:w-3/4">
                        <div className="w-full">
                            {faqs.map((faq, index) => (
                                <FAQItem
                                    key={index}
                                    question={faq.question}
                                    answer={faq.answer}
                                    isOpen={openIndex === index}
                                    toggleOpen={() => toggleFAQ(index)}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FAQ;