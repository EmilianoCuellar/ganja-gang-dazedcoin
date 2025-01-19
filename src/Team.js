import React from "react";

function Team() {
  return (
    <div className="min-h-screen px-6 py-12">
      <h1 className="text-pink text-3xl font-bold mb-4">Meet the Team</h1>
      <p className="mb-4">Our talented team is driving innovation in cannabis and blockchain.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white text-black p-6 rounded-lg">
          <h2 className="font-bold text-lg mb-2">Team Member Name</h2>
          <p>Role and description will go here.</p>
        </div>
        {/* Add more cards as needed */}
      </div>
    </div>
  );
}

export default Team;
