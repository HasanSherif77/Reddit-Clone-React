// src/components/FloatingChat.js
import React, { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import { API_BASE, authFetch } from "../../utils/api";

const FloatingChat = ({ currentUser, onClose }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const socketRef = useRef(null);
  const messagesRef = useRef([]);
  messagesRef.current = messages;

  const token = localStorage.getItem("token");

  // ---------------------------
  // Setup Socket.IO
  // ---------------------------
  useEffect(() => {
    if (!currentUser) return;

    const socket = io(API_BASE.replace(/\/$/, ""), {
      transports: ["websocket"],
    });

    socketRef.current = socket;

    socket.on("connect", () => {
      socket.emit("join", currentUser.id);
    });

    // Listen for incoming messages
    socket.on("new_message", (msg) => {
      if (
        selectedUser &&
        (msg.from === selectedUser.id || msg.to === selectedUser.id)
      ) {
        setMessages((prev) => {
          if (prev.some((m) => m._id === msg._id)) return prev;
          return [...prev, msg];
        });
      }
    });

    return () => {
      socket.disconnect();
      socketRef.current = null;
    };
  }, [currentUser, selectedUser]);

  // Scroll to bottom when messages update
  useEffect(() => {
    const el = document.getElementById("floating-chat-messages");
    if (el) el.scrollTop = el.scrollHeight + 100;
  }, [messages]);

  // ---------------------------
  // SEARCH USERS
  // ---------------------------
  const handleSearch = async () => {
    if (!searchQuery) return;
    try {
      const res = await fetch(
        `${API_BASE}/api/users/search?q=${encodeURIComponent(searchQuery)}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await res.json();
      setSearchResults(data.users || []);
    } catch (err) {
      console.error("Search failed", err);
    }
  };

  // ---------------------------
  // FETCH CHAT HISTORY
  // ---------------------------
  const fetchMessages = async (userId) => {
    setLoading(true);
    try {
      const res = await authFetch(`/api/dm/history/${userId}`, token);
      const data = await res.json();
      setMessages(data || []);
    } catch (err) {
      console.error("Fetch history failed", err);
    } finally {
      setLoading(false);
    }
  };

  // ---------------------------
  // SELECT USER
  // ---------------------------
  const selectUser = (user) => {
    setSelectedUser(user);
    setSearchResults([]);
    setSearchQuery("");
    fetchMessages(user.id);
  };

  // ---------------------------
  // SEND MESSAGE
  // ---------------------------
  const sendMessage = async () => {
    if (!newMessage.trim() || !selectedUser) return;

    const payload = { to: selectedUser.id, text: newMessage.trim() };
    const tempId = `temp-${Date.now()}`;
    const optimistic = {
      _id: tempId,
      from: currentUser.id,
      to: selectedUser.id,
      text: newMessage.trim(),
      createdAt: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, optimistic]);
    setNewMessage("");

    try {
      const res = await authFetch("/api/dm/send", token, {
        method: "POST",
        body: JSON.stringify(payload),
      });
      const saved = await res.json();
      setMessages((prev) =>
        prev.map((m) => (m._id === tempId ? saved : m))
      );
    } catch (err) {
      console.error("Send failed", err);
    }
  };

  return (
    <div style={styles.chatWrapper}>
      <div style={styles.header}>
        <span>
          {selectedUser
            ? `Chat with ${selectedUser.username}`
            : "Direct Messages"}
        </span>
        <button style={styles.closeBtn} onClick={onClose}>
          ✕
        </button>
      </div>

      {!selectedUser && (
        <div style={styles.searchContainer}>
          <input
            style={styles.searchInput}
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div style={{ display: "flex", gap: 8 }}>
            <button style={styles.searchBtn} onClick={handleSearch}>
              Search
            </button>
            <button
              style={styles.searchBtn}
              onClick={() => {
                setSearchQuery("");
                setSearchResults([]);
              }}
            >
              Clear
            </button>
          </div>
          <div style={styles.searchResults}>
            {searchResults.map((user) => (
              <div
                key={user.id}
                style={styles.userItem}
                onClick={() => selectUser(user)}
              >
                {user.username}
              </div>
            ))}
            {searchResults.length === 0 && (
              <div style={{ padding: 8, color: "#666" }}>No results</div>
            )}
          </div>
        </div>
      )}

      {selectedUser && (
        <div style={styles.messageContainer}>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <div id="floating-chat-messages" style={styles.messagesList}>
              {messages.map((msg) => (
                <div
                  key={msg._id}
                  style={
                    msg.from === String(currentUser.id)
                      ? styles.sentMsg
                      : styles.receivedMsg
                  }
                >
                  {msg.text}
                </div>
              ))}
            </div>
          )}

          <div style={styles.inputContainer}>
            <input
              style={styles.messageInput}
              placeholder="Type a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") sendMessage();
              }}
            />
            <button style={styles.sendBtn} onClick={sendMessage}>
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// Styles remain exactly the same as your previous version
const styles = {
  chatWrapper: {
    position: "fixed",
    bottom: 20,
    right: 20,
    width: 360,
    height: 500,
    backgroundColor: "#fff",
    border: "1px solid #ccc",
    borderRadius: 10,
    display: "flex",
    flexDirection: "column",
    boxShadow: "0px 6px 30px rgba(0,0,0,0.15)",
    zIndex: 1000,
    overflow: "hidden",
  },
  header: {
    padding: 12,
    background: "#0079D3",
    color: "#fff",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontWeight: "bold",
  },
  closeBtn: { background: "transparent", color: "#fff", border: "none", cursor: "pointer", fontSize: 18 },
  searchContainer: { padding: 12, display: "flex", flexDirection: "column", gap: 8 },
  searchInput: { padding: 8, borderRadius: 6, border: "1px solid #ccc" },
  searchBtn: { padding: "8px 12px", borderRadius: 6, border: "none", background: "#0079D3", color: "#fff", cursor: "pointer" },
  searchResults: { maxHeight: 260, overflowY: "auto", borderTop: "1px solid #eee", marginTop: 8 },
  userItem: { padding: 10, borderBottom: "1px solid #f0f0f0", cursor: "pointer" },
  messageContainer: { display: "flex", flexDirection: "column", flex: 1, padding: 12 },
  messagesList: { flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: 8, paddingBottom: 8 },
  sentMsg: { alignSelf: "flex-end", background: "#DCF8C6", padding: "8px 12px", borderRadius: 16, maxWidth: "80%" },
  receivedMsg: { alignSelf: "flex-start", background: "#F1F0F0", padding: "8px 12px", borderRadius: 16, maxWidth: "80%" },
  inputContainer: { display: "flex", gap: 8, marginTop: 8 },
  messageInput: { flex: 1, padding: 8, borderRadius: 8, border: "1px solid #ccc" },
  sendBtn: { padding: "8px 12px", borderRadius: 8, border: "none", background: "#0079D3", color: "#fff", cursor: "pointer" },
};

export default FloatingChat;
