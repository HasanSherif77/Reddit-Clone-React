import "./FiltersDropdowns.css";

export default function FiltersDropdowns() {
  return (
    <div className="filters">
      <select>
        <option>Relevance</option>
        <option>Hot</option>
        <option>Top</option>
        <option>New</option>
      </select>

      <select>
        <option>All time</option>
        <option>Today</option>
        <option>This week</option>
        <option>This month</option>
      </select>
      <div className="filters-divider"></div>
    </div>
    
  );
}