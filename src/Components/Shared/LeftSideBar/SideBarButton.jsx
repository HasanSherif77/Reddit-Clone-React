import React from "react";

function SidebarButton({ icon, label, active = false, onClick }) {
    return (
    <button
        className={`leftsidebar-item ${active ? "leftsidebar-item-active" : ""}`}
        onClick={onClick}
    >
        <img src={icon} alt={label} className="leftsidebar-icon" />
        <span>{label}</span>
    </button>
    );
}

export default SidebarButton;
