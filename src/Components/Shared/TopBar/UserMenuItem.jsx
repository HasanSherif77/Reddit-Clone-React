function UserMenuItem({ icon, label, subtitle }) {
    return (
        <button className="usermenu-item">
        <img src={icon} alt={label} className="usermenu-icon" />

        {subtitle ? (
        <div className="usermenu-item-content">
            <span>{label}</span>
            <span className="usermenu-item-subtitle">{subtitle}</span>
        </div>
        ) : (
        <span>{label}</span>
        )}
        </button>
    );
}
export default UserMenuItem;