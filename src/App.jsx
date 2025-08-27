import GoogleCalendar from "./components/GoogleCalendar";

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fcfffc] to-[#fff2e2] font-montserrat py-12 flex flex-col items-center">
      
      {/* Title + Description */}
      <div className="text-center mb-12 w-full max-w-3xl px-4 mx-auto">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r from-[#6c5f83] to-[#c2b9d7] bg-clip-text text-transparent mb-4">
          Event Calendar
        </h1>
        <p className="text-lg sm:text-xl text-[#322343]">
          Stay connected with all upcoming and past Senior Caucus activities.
        </p>
      </div>

      {/* Calendar Card */}
      <div className="w-full max-w-4xl mx-auto bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-[#ded4f1] p-6 sm:p-8">
        <div className="flex justify-center">
          <GoogleCalendar />
        </div>
      </div>

    </div>
  );
}

export default App;
