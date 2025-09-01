export default function CallToActionStrip() {
  return (
    <section id="volunteer" className="px-12 py-20 bg-green-700 text-white text-center">
  <h2 className="text-3xl font-bold">Be Part of the Change</h2>
  <p className="mt-4 text-lg">
    Volunteer with us and help create a cleaner Siwaka. Together we can 
    make a lasting difference.
  </p>
  <div className="mt-6 flex justify-center gap-4">
    <button className="px-6 py-3 bg-white text-green-700 rounded-md font-semibold hover:bg-gray-200">
      Volunteer Now
    </button>
    <button className="px-6 py-3 border border-white rounded-md font-semibold hover:bg-green-900">
      Take Survey
    </button>
  </div>
</section>
  );
}
