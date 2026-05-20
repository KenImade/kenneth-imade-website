export default function Footer() {
  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 mt-24 px-6 py-8">
      <div className="max-w-4xl mx-auto flex items-center justify-between text-xs text-gray-400">
        {/* ↓ Replace with your name */}
        <span>© {new Date().getFullYear()} Kenneth Imade</span>
        <span className="text-gray-300 dark:text-gray-700">
          Data Engineering · Analytics Engineering · Machine Learning
        </span>
      </div>
    </footer>
  )
}
