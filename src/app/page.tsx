import { Header } from "@/components/Header";
import Link from "next/link";

export default function Home() {
  return (

    <div className="bg-gradient-to-br from-blue-50 to-blue-100 text-gray-900 min-h-screen">
       <Header />
      {/* Hero Section */}
      <section className="h-screen flex flex-col items-center justify-center text-center">
        <h1 className="text-6xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
           Welcome to My First Test Form Project
        </h1>
        <p className="text-lg text-gray-700 max-w-2xl">
          Your one-stop platform for seamless education and online learning. 
          Explore courses, connect with experts, and enhance your skills.
        </p>
        <Link
          href="/signUp"
          className="mt-8 px-8 py-3 bg-blue-600 text-white rounded-full text-lg font-semibold shadow-lg hover:bg-blue-700 transform hover:scale-105 transition duration-300"
        >
          Get Started
        </Link>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-16">
            Why Choose EduMart?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            
            {/* Feature Card 1 */}
            <div className="p-8 bg-gray-100 rounded-xl shadow-lg text-center transform hover:scale-105 transition-all duration-300 hover:shadow-2xl">
              <div className="text-4xl mb-4 text-blue-500">🎓</div>
              <h3 className="text-2xl font-semibold text-blue-600 mb-2">Expert Instructors</h3>
              <p className="text-gray-600">Learn from the best instructors with real-world experience.</p>
            </div>

            {/* Feature Card 2 */}
            <div className="p-8 bg-gray-100 rounded-xl shadow-lg text-center transform hover:scale-105 transition-all duration-300 hover:shadow-2xl">
              <div className="text-4xl mb-4 text-green-500">💡</div>
              <h3 className="text-2xl font-semibold text-green-600 mb-2">Interactive Learning</h3>
              <p className="text-gray-600">Engage in hands-on projects and live classes.</p>
            </div>

            {/* Feature Card 3 */}
            <div className="p-8 bg-gray-100 rounded-xl shadow-lg text-center transform hover:scale-105 transition-all duration-300 hover:shadow-2xl">
              <div className="text-4xl mb-4 text-purple-500">⏳</div>
              <h3 className="text-2xl font-semibold text-purple-600 mb-2">Flexible Schedule</h3>
              <p className="text-gray-600">Access courses anytime, anywhere, at your own pace.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-gray-900 text-white text-center">
        <p className="text-lg">© {new Date().getFullYear()} EduMart. All Rights Reserved.</p>
      </footer>
      
    </div>
  );
}
