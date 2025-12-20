import CommunitiesSection from "./CommunitiesSection";
import PeopleSection from "./PeopleSection";
import "./RightSidebar.css";

export default function RightSidebar({ searchQuery = "" }) {
  return (
    <div className="right-sidebar">
      <CommunitiesSection searchQuery={searchQuery} />
      <div className="divider"></div>
      <PeopleSection searchQuery={searchQuery} />
    </div>
  );
}