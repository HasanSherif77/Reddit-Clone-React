import "./SearchTabsBar.css";

export default function SearchTabsBar({ activeTab, onTabChange }) {
  const tabs = ["All", "Posts", "Communities", "Comments", "Media", "People"];

  return (
    <div className="search-tabs">
      {tabs.map((tab) => (
        <button
          key={tab}
          className={`tab-btn ${activeTab === tab ? "active" : ""}`}
          onClick={() => onTabChange(tab)}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
