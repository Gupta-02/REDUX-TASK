import Navbar from '../components/Navbar/Navbar';
import Card from '../components/Card/Card';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">About BlogApp</h1>
          <p className="text-xl text-gray-600">
            Learn more about our mission and the technology behind our platform.
          </p>
        </div>

        <div className="space-y-8">
          <Card>
            <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
            <p className="text-gray-700 leading-relaxed">
              BlogApp is designed to provide a modern, efficient, and user-friendly platform for writers and readers. 
              We believe in the power of sharing knowledge and stories, and our goal is to make it as easy as possible 
              for anyone to publish their thoughts and connect with a global audience.
            </p>
          </Card>

          <Card>
            <h2 className="text-2xl font-semibold mb-4">Technology Stack</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium mb-2">Frontend</h3>
                <ul className="text-gray-700 space-y-1">
                  <li>• Next.js - React framework</li>
                  <li>• Redux Toolkit - State management</li>
                  <li>• Redux-Saga - Side effects handling</li>
                  <li>• Tailwind CSS - Styling</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">Backend & APIs</h3>
                <ul className="text-gray-700 space-y-1">
                  <li>• Next.js API Routes</li>
                  <li>• DummyJSON API integration</li>
                  <li>• RESTful API design</li>
                  <li>• JWT Authentication</li>
                </ul>
              </div>
            </div>
          </Card>

          <Card>
            <h2 className="text-2xl font-semibold mb-4">Features</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl mb-2">🔐</div>
                <h3 className="font-medium mb-2">Secure Authentication</h3>
                <p className="text-sm text-gray-600">JWT-based authentication with secure login/logout</p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-2">📝</div>
                <h3 className="font-medium mb-2">Rich Editor</h3>
                <p className="text-sm text-gray-600">Create and edit posts with our intuitive editor</p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-2">🔍</div>
                <h3 className="font-medium mb-2">Search & Filter</h3>
                <p className="text-sm text-gray-600">Find posts easily with our search functionality</p>
              </div>
            </div>
          </Card>

          <Card>
            <h2 className="text-2xl font-semibold mb-4">Team</h2>
            <p className="text-gray-700 leading-relaxed">
              BlogApp is built by passionate developers who believe in creating quality software. 
              Our team combines expertise in modern web technologies with a deep understanding of user experience 
              to deliver a platform that serves both writers and readers effectively.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}
