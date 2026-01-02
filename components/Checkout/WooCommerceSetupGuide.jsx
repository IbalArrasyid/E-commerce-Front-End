"use client";

import { useState } from "react";
import { AlertCircle, Key, Globe, ExternalLink, Check, X } from "lucide-react";
import { isWooCommerceConfigured, getWooCommerceSetupInstructions } from "@/lib/woocommerce";

export default function WooCommerceSetupGuide({ onClose, onConfigured }) {
  const [copiedIndex, setCopiedIndex] = useState(null);
  const isConfigured = isWooCommerceConfigured();
  const instructions = getWooCommerceSetupInstructions();

  const copyToClipboard = (text, index) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const testConnection = () => {
    if (typeof window !== 'undefined') {
      window.open('/api/test-woo', '_blank');
    }
  };

  if (isConfigured) {
    return null; // Don't show if already configured
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                <AlertCircle className="w-5 h-5 text-yellow-600" />
              </div>
              <div>
                <h2 className="text-lg font-medium">WooCommerce Setup Required</h2>
                <p className="text-sm text-gray-600">
                  Configure your store connection to enable order processing
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Status */}
          <div className="flex items-center gap-3 p-3 bg-red-50 border border-red-200 rounded-lg">
            <Key className="w-5 h-5 text-red-600 flex-shrink-0" />
            <div>
              <p className="font-medium text-red-800">WooCommerce API Not Configured</p>
              <p className="text-sm text-red-600">
                Your checkout system needs API credentials to communicate with your store
              </p>
            </div>
          </div>

          {/* Instructions */}
          <div>
            <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
              <Globe className="w-5 h-5" />
              Setup Instructions
            </h3>

            <div className="space-y-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-2">Step 1: Get API Keys from WooCommerce</h4>
                <ol className="text-sm text-blue-800 space-y-1 list-decimal list-inside ml-4">
                  <li>Login to your WordPress admin dashboard</li>
                  <li>Navigate to <strong>WooCommerce → Settings → Advanced → API</strong></li>
                  <li>Click <strong>&quot;Add Key&quot;</strong> to create a new API key</li>
                  <li>Give it a descriptive name (e.g., &quot;Frontend Checkout&quot;)</li>
                  <li>Select <strong>&quot;Read/Write&quot;</strong> permissions</li>
                  <li>Save the Consumer Key and Consumer Secret</li>
                </ol>
              </div>

              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-medium text-green-900 mb-3">Step 2: Configure Environment Variables</h4>
                <p className="text-sm text-green-800 mb-3">
                  Create a <code className="bg-green-100 px-1 py-0.5 rounded text-xs">.env.local</code> file in your project root with these variables:
                </p>

                <div className="space-y-2">
                  {instructions.missing.map((env, index) => (
                    <div key={index} className="flex items-center gap-2 bg-white p-2 rounded border border-green-300">
                      <code className="text-xs font-mono flex-1">{env}</code>
                      <button
                        onClick={() => copyToClipboard(env, index)}
                        className="p-1 hover:bg-green-100 rounded transition-colors"
                        title="Copy to clipboard"
                      >
                        {copiedIndex === index ? (
                          <Check size={16} className="text-green-600" />
                        ) : (
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h2a2 2 0 012 2v8a2 2 0 01-2 2z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 3h4a2 2 0 012 2v4a2 2 0 01-2 2h-4" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9h12" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6" />
                          </svg>
                        )}
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-purple-50 p-4 rounded-lg">
                <h4 className="font-medium text-purple-900 mb-3">Step 3: Test Connection</h4>
                <p className="text-sm text-purple-800 mb-3">
                  Verify your API credentials are working correctly:
                </p>
                <button
                  onClick={testConnection}
                  className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors text-sm"
                >
                  <ExternalLink size={16} />
                  Test API Connection
                </button>
              </div>
            </div>
          </div>

          {/* Quick Setup */}
          <div>
            <h3 className="text-lg font-medium mb-4">Quick Setup Commands</h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-700 mb-3">
                If you have the API keys ready, run this command to quickly create your .env.local file:
              </p>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <code className="text-xs bg-gray-200 px-2 py-1 rounded">Terminal</code>
                  <code className="text-xs text-red-600">cat &gt; .env.local</code>
                </div>

                <div className="space-y-1">
                  {instructions.missing.map((env, index) => (
                    <div key={index} className="text-xs text-gray-600">
                      <span className="text-gray-400"># </span>
                      <span className="font-mono">{env}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Help */}
          <div>
            <h3 className="text-lg font-medium mb-4">Need Help?</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">📚 Documentation</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• <a href="https://woocommerce.github.io/woocommerce-rest-api-docs/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">WooCommerce REST API Docs</a></li>
                  <li>• <a href="https://woocommerce.github.io/woocommerce-rest-api-docs/#authentication" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">API Authentication Guide</a></li>
                </ul>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">🔧 Common Issues</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Make sure API keys have <strong>Read/Write</strong> permissions</li>
                  <li>• Verify your store URL is accessible</li>
                  <li>• Check that CORS is properly configured</li>
                  <li>• Restart your development server after adding .env.local</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4 border-t">
            <button
              onClick={() => window.location.reload()}
              className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Reload Page
            </button>

            <button
              onClick={onClose}
              className="flex-1 bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}