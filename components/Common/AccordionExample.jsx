'use client'

import React from 'react'
import Accordion from './Accordion'
import { Star, Shield, Truck, Award, Users, Clock } from 'lucide-react'

const AccordionExample = () => {
  // Example 1: Basic FAQ
  const faqItems = [
    {
      id: 'faq1',
      title: 'What is your return policy?',
      content: (
        <div className="space-y-2">
          <p>We offer a 30-day return policy for all unused items in their original packaging.</p>
          <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
            <li>Items must be in original condition</li>
            <li>Original packaging required</li>
            <li>Proof of purchase needed</li>
          </ul>
        </div>
      )
    },
    {
      id: 'faq2',
      title: 'Do you offer delivery services?',
      content: (
        <p className="leading-relaxed">
          Yes, we provide professional delivery services across Indonesia. Our team ensures safe and timely delivery
          of your furniture with installation services available upon request.
        </p>
      )
    },
    {
      id: 'faq3',
      title: 'Can I customize furniture designs?',
      content: (
        <div className="space-y-2">
          <p>Absolutely! We offer extensive customization options including:</p>
          <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
            <li>Fabric and material selection</li>
            <li>Color customization</li>
            <li>Size adjustments</li>
            <li>Design modifications</li>
          </ul>
        </div>
      )
    }
  ]

  // Example 2: Feature showcase with icons
  const featureItems = [
    {
      id: 'feature1',
      title: 'Quality & Durability',
      icon: <Star className="w-6 h-6 text-green-600" />,
      content: (
        <div className="space-y-3">
          <p>Each piece in our collection isn&apos;t just aesthetically pleasing—it&apos;s built to endure, ensuring that your investment is both stylish and long-lasting.</p>
          <div className="bg-green-50 p-4 rounded-lg">
            <p className="text-sm text-green-800 font-medium">Premium materials sourced from trusted suppliers</p>
          </div>
        </div>
      )
    },
    {
      id: 'feature2',
      title: 'Expert Guidance',
      icon: <Users className="w-6 h-6 text-green-600" />,
      content: (
        <div className="space-y-3">
          <p>Our experienced staff are more than salespeople—they&apos;re advisors who will work with you to create the ideal furniture that fits seamlessly into your space.</p>
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-blue-800 font-medium">15+ years of industry experience</p>
          </div>
        </div>
      )
    },
    {
      id: 'feature3',
      title: 'Professional Installation',
      icon: <Truck className="w-6 h-6 text-green-600" />,
      content: (
        <div className="space-y-3">
          <p>We offer professional installation services with skilled installers ensuring a seamless and efficient process from selection to flawless finish.</p>
          <div className="bg-purple-50 p-4 rounded-lg">
            <p className="text-sm text-purple-800 font-medium">Free installation on orders above Rp 5,000,000</p>
          </div>
        </div>
      )
    }
  ]

  // Example 3: Service details
  const serviceItems = [
    {
      id: 'service1',
      title: 'Free Design Consultation',
      icon: <Clock className="w-5 h-5 text-blue-600" />,
      content: (
        <div>
          <p className="mb-3">Get personalized design advice from our interior experts:</p>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
              <span>Room layout planning</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
              <span>Color scheme coordination</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
              <span>Furniture selection guidance</span>
            </li>
          </ul>
        </div>
      )
    },
    {
      id: 'service2',
      title: 'Warranty Protection',
      icon: <Shield className="w-5 h-5 text-green-600" />,
      content: (
        <div>
          <p className="mb-3">Comprehensive warranty coverage for your peace of mind:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="border border-gray-200 rounded-lg p-3">
              <p className="font-medium text-sm">Structural Warranty</p>
              <p className="text-xs text-gray-600">Up to 5 years</p>
            </div>
            <div className="border border-gray-200 rounded-lg p-3">
              <p className="font-medium text-sm">Fabric Warranty</p>
              <p className="text-xs text-gray-600">Up to 2 years</p>
            </div>
          </div>
        </div>
      )
    }
  ]

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-12">
      {/* Default Variant */}
      <section>
        <h2 className="text-2xl font-bold mb-6 text-gray-900">Frequently Asked Questions</h2>
        <Accordion
          items={faqItems}
          variant="default"
          allowMultiple={true}
        />
      </section>

      {/* Modern Variant with Icons */}
      <section>
        <h2 className="text-2xl font-bold mb-6 text-gray-900">Our Features</h2>
        <Accordion
          items={featureItems}
          variant="modern"
          allowMultiple={true}
          className="max-w-3xl"
        />
      </section>

      {/* Minimal Variant */}
      <section>
        <h2 className="text-2xl font-bold mb-6 text-gray-900">Our Services</h2>
        <Accordion
          items={serviceItems}
          variant="minimal"
          allowMultiple={false}
          defaultOpenItems={['service1']}
        />
      </section>

      {/* Custom Styled Example */}
      <section>
        <h2 className="text-2xl font-bold mb-6 text-gray-900">Custom Styled Accordion</h2>
        <Accordion
          items={[
            {
              id: 'custom1',
              title: 'Custom Styling Example',
              content: 'This accordion uses custom styling classes to override the default appearance.'
            }
          ]}
          className="bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-xl"
          itemClassName="bg-white/80 backdrop-blur-sm border border-green-200"
          titleClassName="px-6 py-4 bg-gradient-to-r from-green-600 to-green-700 text-white hover:from-green-700 hover:to-green-800 rounded-lg font-bold"
          contentClassName="px-6 py-4 bg-white/60"
        />
      </section>
    </div>
  )
}

export default AccordionExample