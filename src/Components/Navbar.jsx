// src/components/Navbar.js
import React from "react";

const Navbar = ({ currentUser, onLoginClick, onOpenChat }) => {
  return (
    <nav style={styles.nav}>
      <h2>Reddit</h2>
      <div style={styles.right}>
        {currentUser ? (
          <>
            {/* DM icon button */}
            <button style={styles.iconBtn} onClick={onOpenChat}>
              💬 {/* Using emoji instead of SVG */}
            </button>
            <span style={{ marginLeft: "10px" }}>Hi, {currentUser.username}</span>
          </>
        ) : (
          <button style={styles.loginBtn} onClick={onLoginClick}>
            Log In
          </button>
        )}
      </div>
    </nav>
  );
};

const styles = {
  nav: {
    height: "60px",
    background: "white",
    borderBottom: "1px solid #ccc",
    padding: "0 20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  loginBtn: {
    backgroundColor: "#0079D3",
    color: "white",
    padding: "8px 16px",
    border: "none",
    borderRadius: "20px",
    cursor: "pointer",
  },
  right: {
    display: "flex",
    alignItems: "center",
  },
  iconBtn: {
    background: "transparent",
    border: "none",
    cursor: "pointer",
    fontSize: "20px",
    padding: "6px",
  },
};

export default Navbar;
