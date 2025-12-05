import CommunitiesSection from "./CommunitiesSection";
import PeopleSection from "./PeopleSection";
import "./RightSidebar.css";

export default function RightSidebar() {
  return (
    <div className="right-sidebar">
      <CommunitiesSection />
      <div className="divider"></div>
      <PeopleSection />
    </div>
  );
}