import { SignInForm } from "../SignInForm";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
            Welcome to BlogCraft
          </h2>
          <p className="text-gray-600">
            Sign in to start writing and sharing your stories
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-8">
          <SignInForm />
        </div>
        
        <div className="text-center text-sm text-gray-500">
          <p>
            New to BlogCraft? Create an account by signing in with your preferred method above.
          </p>
        </div>
      </div>
    </div>
  );
}
