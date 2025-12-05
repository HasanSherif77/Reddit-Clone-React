import React, { useState } from "react";
import "./App.css";
import PostDetails from "./Pages/PostDetails/PostDetails";
function App() {  
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <PostDetails />

  );
}

export default App;
