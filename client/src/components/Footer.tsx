export default function Footer() {
  return (
    <footer className="text-center py-6 text-gray-300 dark:text-gray-400 border-t border-white/10 bg-transparent">
      &copy; {new Date().getFullYear()} Salesforce Decode. All rights reserved.
    </footer>
  );
}
