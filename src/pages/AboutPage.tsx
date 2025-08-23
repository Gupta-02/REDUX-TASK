export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          About BlogCraft
        </h1>
        <p className="text-xl text-gray-600">
          A modern blogging platform built with cutting-edge technology
        </p>
      </div>

      <div className="prose prose-lg max-w-none">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
          <p className="text-gray-700 leading-relaxed">
            BlogCraft is designed to empower writers and content creators with a simple, 
            elegant platform to share their stories with the world. We believe that everyone 
            has a story worth telling, and we're here to provide the tools to tell it beautifully.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              🚀 Modern Technology
            </h3>
            <p className="text-gray-600">
              Built with React, TypeScript, and Convex for a fast, reliable, 
              and scalable blogging experience.
            </p>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              ✨ Beautiful Design
            </h3>
            <p className="text-gray-600">
              Clean, responsive design that looks great on all devices and 
              puts your content front and center.
            </p>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              🔒 Secure & Private
            </h3>
            <p className="text-gray-600">
              Your data is protected with enterprise-grade security and 
              authentication powered by Convex Auth.
            </p>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              ⚡ Real-time Updates
            </h3>
            <p className="text-gray-600">
              Experience real-time updates and seamless collaboration 
              with our reactive database technology.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Technology Stack</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-3xl mb-2">⚛️</div>
              <div className="font-medium">React</div>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">📘</div>
              <div className="font-medium">TypeScript</div>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">🔥</div>
              <div className="font-medium">Convex</div>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">🎨</div>
              <div className="font-medium">Tailwind CSS</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
