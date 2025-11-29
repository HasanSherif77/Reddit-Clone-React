import React, { useState } from "react";

function CreateCommunityForm({ onCreate }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const newCommunity = {
      name,
      description,
      members: 1,
    };

    onCreate(newCommunity);

    setName("");
    setDescription("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 max-w-md">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Community name"
        className="border p-2 rounded"
      />

      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Community description"
        className="border p-2 rounded"
      />

      <button
        type="submit"
        className="bg-blue-500 text-white px-3 py-2 rounded"
      >
        Create
      </button>
    </form>
  );
}

export default CreateCommunityForm;

