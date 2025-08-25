"use client";
export default function Card() {
  const [email, setEmail] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchData = async () => {
    setLoading(true);
    setError("");
    try {
      // Dummy API for demonstration
      const response = await fetch("https://jsonplaceholder.typicode.com/users?email=" + email);
      const result = await response.json();
      setData(result.length ? result[0] : null);
    } catch (err) {
      setError("Failed to fetch data.");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl mt-8 p-6">
      <h2 className="text-2xl font-bold mb-4 text-blue-600">Fetch User by Email</h2>
      <div className="flex flex-col gap-4">
        <input
          type="email"
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Enter email address"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
          onClick={fetchData}
          disabled={loading || !email}
        >
          {loading ? "Fetching..." : "Fetch Data"}
        </button>
        {error && <div className="text-red-500">{error}</div>}
        {data && (
          <div className="bg-gray-100 p-4 rounded mt-4">
            <h3 className="font-semibold text-lg mb-2">User Details</h3>
            <p><span className="font-medium">Name:</span> {data.name}</p>
            <p><span className="font-medium">Email:</span> {data.email}</p>
            <p><span className="font-medium">Username:</span> {data.username}</p>
            <p><span className="font-medium">Phone:</span> {data.phone}</p>
            <p><span className="font-medium">Website:</span> {data.website}</p>
          </div>
        )}
      </div>
    </div>
  );
}