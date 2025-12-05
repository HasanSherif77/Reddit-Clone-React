import "./App.css";
import TopBar from "./Components/Shared/TopBar/TopBar";
import LeftSideBar from "./Components/Shared/LeftSideBar/LeftSideBar";
import Home from "./Pages/Home/Home";
import CreatePost from "./Pages/CreatePost/CreatePost";
import PostDetails from "./Pages/PostDetails/PostDetails";
import SearchResults from "./Pages/SearchResults/SearchResults";
import Notifications from "./Pages/Notifications/Notifications";


function App() {

  return (
    <div className="App">
      <TopBar />
      <div className="leftsidebar-layout">
        <LeftSideBar
          isOpen={isSidebarOpen}
          onToggle={() => setIsSidebarOpen((prev) => !prev)}
        />
        <main className="leftsidebar-content">
          <PostDetails />
        </main>
      </div>
    </div>
  );
}

export default App;
