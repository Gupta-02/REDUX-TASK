export default function ContactPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Get in Touch
        </h1>
        <p className="text-xl text-gray-600">
          We'd love to hear from you. Send us a message and we'll respond as soon as possible.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Contact Form */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a message</h2>
          <form className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Your name"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="What's this about?"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                Message
              </label>
              <textarea
                id="message"
                rows={6}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Your message..."
              />
            </div>

            <button
              type="submit"
              className="w-full inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Contact Info */}
        <div className="space-y-8">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h2>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="text-2xl mr-4">📧</div>
                <div>
                  <div className="font-medium text-gray-900">Email</div>
                  <div className="text-gray-600">hello@blogcraft.com</div>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="text-2xl mr-4">🌐</div>
                <div>
                  <div className="font-medium text-gray-900">Website</div>
                  <div className="text-gray-600">www.blogcraft.com</div>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="text-2xl mr-4">💬</div>
                <div>
                  <div className="font-medium text-gray-900">Support</div>
                  <div className="text-gray-600">Available 24/7</div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-900 mb-1">How do I create an account?</h4>
                <p className="text-gray-600 text-sm">Click the "Sign In" button and follow the registration process.</p>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-900 mb-1">Is BlogCraft free to use?</h4>
                <p className="text-gray-600 text-sm">Yes! BlogCraft is completely free for all users.</p>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-900 mb-1">Can I customize my blog?</h4>
                <p className="text-gray-600 text-sm">You can customize your posts with tags and formatting options.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
