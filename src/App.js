import React, { useState } from "react";
import "./App.css";
import Home from "./Pages/Home/Home";
import SearchResults from "./Pages/SearchResults/SearchResults";
import PostDetails from "./Pages/PostDetails/PostDetails";
import CreatePost from "./Pages/CreatePost/CreatePost";
function App() {  
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <PostDetails />

  );
}

export default App;
