import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

export default function FAQSection() {
  const [openItems, setOpenItems] = useState([]);

  const faqs = [
    {
      id: 1,
      question: "What video formats do you support for conversion?",
      answer: "We support all major video formats including MP4, MKV, AVI, WEBM, MOV, WMV, FLV, and many more. Our advanced conversion engine can handle both input and output in over 100 different video formats."
    },
    {
      id: 2,
      question: "Is the video quality affected during conversion?",
      answer: "Our conversion process uses state-of-the-art algorithms to maintain the highest possible quality. You can choose between lossless conversion for maximum quality retention or optimized conversion for smaller file sizes. In most cases, you won't notice any quality difference."
    },
    {
      id: 3,
      question: "How long does the conversion process take?",
      answer: "Conversion time depends on file size, format, and quality settings. Typically, a 100MB video converts in 1-3 minutes. Our cloud-based processing ensures fast conversion speeds with multiple servers handling your requests."
    },
    {
      id: 4,
      question: "What is the maximum file size I can upload?",
      answer: "Free users can upload files up to 500MB. Pro users enjoy unlimited file sizes with priority processing. We also offer batch conversion for multiple files, saving you time on large projects."
    },
    {
      id: 5,
      question: "Is my data secure during conversion?",
      answer: "Absolutely. We use enterprise-grade encryption for all file transfers and processing. Your files are automatically deleted from our servers within 24 hours after conversion. You can also manually delete them immediately after download."
    },
    {
      id: 6,
      question: "Can I convert videos on mobile devices?",
      answer: "Yes! Our platform is fully responsive and works seamlessly on all devices including smartphones and tablets. You can upload, convert, and download videos directly from your mobile browser without any apps."
    },
    {
      id: 7,
      question: "Do you offer batch conversion?",
      answer: "Yes, pro users can convert multiple videos simultaneously. Simply select all the files you want to convert, choose your output format, and our system will process them in parallel for maximum efficiency."
    },
    {
      id: 8,
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards, PayPal, and various digital payment methods. All transactions are processed securely through our payment partners. You can cancel your subscription anytime from your account dashboard."
    }
  ];

  const toggleItem = (id) => {
    setOpenItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  return (
    <div className="bg-gradient-to-br from-slate-50 to-white py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-left mb-16">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-gray-900">
            <span className=" text-black">Frequently Asked </span>
                        <span className="">
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-800 via-cyan-700 to-blue-600">
                                Questions
                            </span>
                        </span>
          </h1>
          <p className="text-xl md:text-2xl max-w-lg text-gray-700 font-light py-4">
            Everything you need to know about our video conversion service
          </p>
        </div>

        {/* FAQ Grid */}
        <div className="max-w-4xl">
          <div className="grid gap-3">
            {faqs.map((faq) => (
              <div
                key={faq.id}
                className="bg-white rounded-2xl border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-200"
              >
                <button
                  onClick={() => toggleItem(faq.id)}
                  className="w-full px-8 py-6 text-left flex items-center justify-between"
                >
                  <h3 className="text-lg font-semibold text-gray-900 pr-4">
                    {faq.question}
                  </h3>
                  <div className="flex-shrink-0">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${
                      openItems.includes(faq.id) 
                        ? 'bg-blue-50 text-blue-600 border-blue-200' 
                        : 'bg-gray-50 text-gray-400 border-gray-200'
                    }`}>
                      {openItems.includes(faq.id) ? (
                        <Minus className="h-5 w-5" />
                      ) : (
                        <Plus className="h-5 w-5" />
                      )}
                    </div>
                  </div>
                </button>
                
                {openItems.includes(faq.id) && (
                  <div className="px-8 pb-6">
                    <p className="text-gray-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}