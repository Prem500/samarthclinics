export default function TestCSS() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-md">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Tailwind CSS Test</h1>
        <p className="text-gray-600 mb-6">
          If you can see this styled properly with a gradient background, 
          white card, and proper typography, then Tailwind CSS is working correctly!
        </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="btn-primary-medical">
                Primary Medical Button
              </button>
              <button className="btn-medical">
                Medical Button
              </button>
              <button className="btn-medical-outline">
                Outline Button
              </button>
            </div>
        <div className="mt-6 p-4 bg-green-100 border border-green-300 rounded">
          <p className="text-green-800 text-sm">
            ✅ Tailwind CSS is working properly!
          </p>
        </div>
      </div>
    </div>
  );
}