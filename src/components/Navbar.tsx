export default function Navbar() {
  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 rounded-full bg-white/5 backdrop-blur-md border px-10 py-4 flex justify-between items-center mx-auto lg:w-2xl  shadow-lg">
      <p>Navbar</p>

      <ul className="flex gap-8 text-sm">
        <li className="cursor-pointer">Home</li>
        <li className="cursor-pointer">About</li>
        <li className="cursor-pointer">Projects</li>
        <li className="cursor-pointer">Contact</li>
      </ul>
    </div>
  );
}
