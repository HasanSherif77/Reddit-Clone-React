import MediaGrid from "./MediaGrid";
import "./MediaSection.css";

export default function MediaPage({ searchQuery = "" }) {
  return (
    <div style={{ padding: "0px 20px 20px 40px" }}>
      <div className="media-header">
        <h3 className="media-label">Media</h3>
        <button className="see-more-btn">See more</button>
      </div>
      <MediaGrid searchQuery={searchQuery} />
    </div>
  );
}