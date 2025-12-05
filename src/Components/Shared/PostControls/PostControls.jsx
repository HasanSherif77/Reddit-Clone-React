import React from "react";
import "./PostControls.css";
import SortBy from "./SortBy";
import ViewToggle from "./ViewToggle";

function PostControls() {
  return (
    <div className="pc-wrapper">
      <div className="pc-inner">
        <SortBy />
        <ViewToggle />
      </div>
    </div>
  );
}


export default PostControls;
