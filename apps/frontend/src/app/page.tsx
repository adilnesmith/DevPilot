export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-center font-mono text-sm">
        <h1 className="text-4xl font-bold mb-4">DevPilot</h1>
        <p className="text-lg mb-8">AI Engineering Assistant Platform</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-2">Code Analysis</h2>
            <p className="text-gray-600">Understand code structure and patterns</p>
          </div>
          <div className="border rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-2">Bug Detection</h2>
            <p className="text-gray-600">Find potential bugs and vulnerabilities</p>
          </div>
          <div className="border rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-2">Test Generation</h2>
            <p className="text-gray-600">Generate comprehensive test suites</p>
          </div>
          <div className="border rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-2">Documentation</h2>
            <p className="text-gray-600">Generate and maintain documentation</p>
          </div>
        </div>
      </div>
    </main>
  );
}
