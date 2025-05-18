import React from 'react';
import { Check, X, Shield, Gift, Star, Zap, Calendar } from 'lucide-react';

export default function FreeServiceSection() {
  return (
    <div className="bg-gradient-to-br from-slate-50 to-white py-24" id='pricing'>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-left mb-16">
          {/* Heading */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight">
            <span className="block text-gray-900">100% Free Forever</span>
            <span className="block mt-1">
            </span>
          </h1>

          {/* Description */}
          <p className="text-xl md:text-2xl max-w-lg text-gray-700 font-light py-4">
            No hidden costs. No subscriptions. No limitations.
          </p>
        </div>
        {/* Main content */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Features comparison */}
          <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">How We Compare</h3>

            <div className="space-y-4">
              {/* Feature comparison rows */}
              <div className="grid grid-cols-3 items-center py-3 border-b border-gray-200">
                <div className="font-medium text-gray-700">High Quality</div>
                <div className="text-center"><Check className="h-5 w-5 mx-auto text-green-500" /></div>
                <div className="text-center"><X className="h-5 w-5 mx-auto text-red-500" /></div>
              </div>

              <div className="grid grid-cols-3 items-center py-3 border-b border-gray-200">
                <div className="font-medium text-gray-700">No Watermarks</div>
                <div className="text-center"><Check className="h-5 w-5 mx-auto text-green-500" /></div>
                <div className="text-center"><X className="h-5 w-5 mx-auto text-red-500" /></div>
              </div>

              <div className="grid grid-cols-3 items-center py-3 border-b border-gray-200">
                <div className="font-medium text-gray-700">Batch Processing</div>
                <div className="text-center"><Check className="h-5 w-5 mx-auto text-green-500" /></div>
                <div className="text-center"><X className="h-5 w-5 mx-auto text-red-500" /></div>
              </div>

              <div className="grid grid-cols-3 items-center py-3 border-b border-gray-200">
                <div className="font-medium text-gray-700">Advanced Settings</div>
                <div className="text-center"><Check className="h-5 w-5 mx-auto text-green-500" /></div>
                <div className="text-center"><X className="h-5 w-5 mx-auto text-red-500" /></div>
              </div>

              <div className="grid grid-cols-3 items-center py-3">
                <div className="font-medium text-gray-700">Cost</div>
                <div className="text-center font-bold text-green-600">FREE</div>
                <div className="text-center font-bold text-red-600">$$$</div>
              </div>
            </div>

            <div className="mt-6 text-sm text-gray-500 flex items-center">
              <div className="w-4 h-4 rounded-full mr-2 bg-blue-100 flex items-center justify-center text-blue-600 text-xs">i</div>
              Compared to average paid services in the market
            </div>
          </div>

          {/* Right side - Benefits */}
          <div className="space-y-8">
            <h3 className="text-2xl font-bold text-gray-900">Why We Keep It Free</h3>

            <div className="space-y-6">
              {/* Benefit 1 */}
              <div className="flex">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-200">
                    <Shield className="h-6 w-6" />
                  </div>
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-semibold text-gray-900">Digital Freedom</h4>
                  <p className="text-gray-600 mt-1">We believe everyone should have access to powerful video conversion tools without barriers.</p>
                </div>
              </div>

              {/* Benefit 2 */}
              <div className="flex">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-12 h-12 rounded-xl bg-green-50 text-green-600 flex items-center justify-center border border-green-200">
                    <Gift className="h-6 w-6" />
                  </div>
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-semibold text-gray-900">Community Support</h4>
                  <p className="text-gray-600 mt-1">Our service is supported by community donations and minimal, non-intrusive ads.</p>
                </div>
              </div>

              {/* Benefit 3 */}
              <div className="flex">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-200">
                    <Star className="h-6 w-6" />
                  </div>
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-semibold text-gray-900">Quality First</h4>
                  <p className="text-gray-600 mt-1">We never compromise on quality or features, even though our service is completely free.</p>
                </div>
              </div>

              {/* Benefit 4 */}
              <div className="flex">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center border border-purple-200">
                    <Zap className="h-6 w-6" />
                  </div>
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-semibold text-gray-900">Always Improving</h4>
                  <p className="text-gray-600 mt-1">We continuously enhance our technology to provide the fastest, most reliable conversion experience.</p>
                </div>
              </div>


            </div>
          </div>
        </div>
      </div>
    </div>
  );
}