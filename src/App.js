import React, { useState } from "react";
import "./App.css";
// 1. E3ml import lel component bta3ak (atamen en el path sa7 3ala 7asab el folder structure)
import EditProfile from "./Pages/EditProfile/EditProfile"; 

function App() {  
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    // 2. Nadyeha hna badal PostDetails
    <EditProfile />
  );
}

export default App;