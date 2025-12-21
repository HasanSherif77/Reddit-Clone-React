// src/components/FloatingChat.js
import React, { useState, useEffect } from "react";
import { API_BASE } from "../../utils/api";
const FloatingChat = ({ currentUser, onClose }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [allMessages, setAllMessages] = useState([]);
  const [conversations, setConversations] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingMessages, setLoadingMessages] = useState(false);

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
    
    const currentToken = localStorage.getItem("token");
    if (!currentToken) {
      console.error("No token available for search");
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/users/search/${encodeURIComponent(searchQuery)}`,
       {
          method: "GET",
          headers: { 
            "Content-Type": "application/json",
            Authorization: `Bearer ${currentToken}` 
          },
        }
      );

      if (!res.ok) {
        throw new Error("Search request failed");
      }

      const data = await res.json();
      setSearchResults(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Search failed", err);
      setSearchResults([]);
    }
  };

  // ---------------------------
  // FETCH ALL MESSAGES
  // ---------------------------
  const fetchAllMessages = async () => {
    const currentToken = localStorage.getItem("token");
    if (!currentToken) {
      console.error("No token available to fetch messages");
      return;
    }
    
    setLoadingMessages(true);
    try {
        const res = await fetch(`${API_BASE}/messages/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${currentToken}`,
        },
      });

      if (!res.ok) {
        throw new Error("Failed to fetch messages");
      }

      const data = await res.json();
      const messagesArray = Array.isArray(data) ? data : [];
      setAllMessages(messagesArray);

      // Group messages by conversation partner
      const conversationsMap = new Map();
      const currentUserId = String(localStorage.getItem("userId") || currentUser?.id || currentUser?._id || "");

      messagesArray.forEach((msg) => {
        const senderId = String(msg.sender?._id || msg.sender);
        const receiverId = String(msg.receiver?._id || msg.receiver);
        
        // Determine the other user in the conversation
        const otherUserId = senderId === currentUserId ? receiverId : senderId;
        const otherUser = senderId === currentUserId 
          ? (msg.receiver?._id ? msg.receiver : { _id: receiverId, username: 'Unknown' })
          : (msg.sender?._id ? msg.sender : { _id: senderId, username: 'Unknown' });

        if (!conversationsMap.has(otherUserId)) {
          conversationsMap.set(otherUserId, {
            userId: otherUserId,
            user: {
              id: otherUserId,
              _id: otherUserId,
              username: otherUser.username || 'Unknown',
              displayname: otherUser.displayname || otherUser.username || 'Unknown',
            },
            lastMessage: msg,
            unreadCount: 0,
            messages: [],
          });
        }

        const conversation = conversationsMap.get(otherUserId);
        conversation.messages.push(msg);
        
        // Update last message if this is more recent
        if (new Date(msg.createdAt) > new Date(conversation.lastMessage.createdAt)) {
          conversation.lastMessage = msg;
        }

        // Count unread messages
        if (!msg.read && receiverId === currentUserId) {
          conversation.unreadCount++;
        }
      });

      // Convert map to array and sort by last message time
      const conversationsArray = Array.from(conversationsMap.values()).sort((a, b) => {
        return new Date(b.lastMessage.createdAt) - new Date(a.lastMessage.createdAt);
      });

      setConversations(conversationsArray);
    } catch (err) {
      console.error("Fetch all messages failed", err);
    } finally {
      setLoadingMessages(false);
    }
  };

  // ---------------------------
  // FETCH MESSAGES FOR SELECTED USER
  // ---------------------------
  const fetchMessages = async (userId) => {
    setLoading(true);
    try {
      // Filter messages for this conversation
        const conversationMessages = allMessages.filter((msg) => {
        const senderId = String(msg.sender?._id || msg.sender);
        const receiverId = String(msg.receiver?._id || msg.receiver);
        const currentUserId = String(localStorage.getItem("userId") || currentUser?.id || currentUser?._id || "");
        const targetUserId = String(userId);

        return (
          (senderId === currentUserId && receiverId === targetUserId) ||
          (senderId === targetUserId && receiverId === currentUserId)
        );
      });

      // Sort by creation time
      conversationMessages.sort((a, b) => {
        return new Date(a.createdAt) - new Date(b.createdAt);
      });

      setMessages(conversationMessages);
    } catch (err) {
      console.error("Fetch messages failed", err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch all messages on mount
  useEffect(() => {
    if (currentUser) {
      const currentToken = localStorage.getItem("token");
      if (currentToken) {
        fetchAllMessages();
      }
    }
  }, [currentUser]);

  // ---------------------------
  // SELECT USER
  // ---------------------------
  const selectUser = (user) => {
    const userId = user._id || user.id;
    setSelectedUser({ 
      ...user, 
      id: userId,
      username: user.username || user.displayname || 'Unknown',
      displayname: user.displayname || user.username || 'Unknown'
    });
    setSearchResults([]);
    setSearchQuery("");
    fetchMessages(userId);
  };

  // ---------------------------
  // SELECT CONVERSATION
  // ---------------------------
  const selectConversation = (conversation) => {
    setSelectedUser(conversation.user);
    fetchMessages(conversation.userId);
  };

  // ---------------------------
  // GO BACK TO CONVERSATIONS LIST
  // ---------------------------
  const goBackToConversations = () => {
    setSelectedUser(null);
    setMessages([]);
    // Refresh messages to update unread counts
    fetchAllMessages();
  };

  // ---------------------------
  // SEND MESSAGE
  // ---------------------------
  const sendMessage = async () => {
    if (!newMessage.trim() || !selectedUser) return;

    const currentToken = localStorage.getItem("token");
    if (!currentToken) {
      console.error("No token available to send message");
      return;
    }

    // Get current user ID from localStorage or currentUser prop
    const currentUserId = localStorage.getItem("userId") || currentUser?.id || currentUser?._id;
    if (!currentUserId) {
      console.error("Current user ID not available");
      return;
    }

    const receiverId = selectedUser.id || selectedUser._id;
    const messageContent = newMessage.trim();
    
    // Backend expects: { content, receiver }
    // Backend gets sender from req.user._id (from token)
    const payload = { 
      receiver: receiverId, 
      content: messageContent
    };
    
    // Validate payload before sending
    if (!messageContent || !receiverId) {
      console.error("Invalid payload - missing content or receiver");
      return;
    }
    
    const tempId = `temp-${Date.now()}`;
    const optimistic = {
      _id: tempId,
      sender: { _id: currentUserId },
      receiver: { _id: receiverId },
      content: messageContent,
      read: false,
      createdAt: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, optimistic]);
    setNewMessage("");

    try {
      const res = await fetch(`${API_BASE}/messages/`, {

        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${currentToken}`,
        },
        body: JSON.stringify(payload),
      });
      

      if (res.ok) {
        const saved = await res.json();
        // Replace optimistic message with saved message
        setMessages((prev) =>
          prev.map((m) => (m._id === tempId ? saved : m))
        );
        // Refresh all messages to update conversation list
        fetchAllMessages();
      } else {
        let errorData = {};
        try {
          const text = await res.text();
          errorData = text ? JSON.parse(text) : {};
        } catch (parseError) {
          console.error("Failed to parse error response:", parseError);
        }
        
        console.error("Send message failed - Status:", res.status);
        console.error("Error:", errorData.error || errorData.message || res.statusText);
        console.error("Full error response:", errorData);
        
        // Show user-friendly error message
        if (errorData.error) {
          alert(`Failed to send message: ${errorData.error}`);
        }
        
        // Remove optimistic message on error
        setMessages((prev) => prev.filter((m) => m._id !== tempId));
      }
    } catch (err) {
      console.error("Send message error:", err);
      // Remove optimistic message on error
      setMessages((prev) => prev.filter((m) => m._id !== tempId));
    }
  };

  return (
    <div style={styles.chatWrapper}>
      <div style={styles.header}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {selectedUser && (
            <button 
              style={styles.backBtn} 
              onClick={goBackToConversations}
              title="Back to conversations"
            >
              ←
            </button>
          )}
          <span>
            {selectedUser
              ? `Chat with ${selectedUser.displayname || selectedUser.username || 'Unknown'}`
              : "Direct Messages"}
          </span>
        </div>
        <button style={styles.closeBtn} onClick={onClose}>
          ✕
        </button>
      </div>

      {!selectedUser && (
        <div style={styles.conversationsContainer}>
          <div style={styles.searchContainer}>
            <input
              style={styles.searchInput}
              placeholder="Search users..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSearch();
              }}
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
            {searchResults.length > 0 && (
              <div style={styles.searchResults}>
                {searchResults.map((user) => (
                  <div
                    key={user._id || user.id}
                    style={styles.userItem}
                    onClick={() => selectUser(user)}
                  >
                    {user.displayname || user.username || 'Unknown User'}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div style={styles.conversationsList}>
            {loadingMessages ? (
              <div style={{ padding: 20, textAlign: 'center', color: '#666' }}>
                Loading conversations...
              </div>
            ) : conversations.length > 0 ? (
              conversations.map((conv) => (
                <div
                  key={conv.userId}
                  style={styles.conversationItem}
                  onClick={() => selectConversation(conv)}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f5f5f5'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#fff'}
                >
                  <div style={styles.conversationInfo}>
                    <div style={styles.conversationName}>
                      {conv.user.displayname || conv.user.username || 'Unknown User'}
                    </div>
                    <div style={styles.conversationPreview}>
                      {conv.lastMessage.content}
                    </div>
                  </div>
                  <div style={styles.conversationMeta}>
                    {conv.unreadCount > 0 && (
                      <span style={styles.unreadBadge}>{conv.unreadCount}</span>
                    )}
                    <div style={styles.conversationTime}>
                      {new Date(conv.lastMessage.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div style={{ padding: 20, textAlign: 'center', color: '#666' }}>
                No conversations yet. Search for users to start chatting.
              </div>
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
              {messages.length > 0 ? (
                messages.map((msg) => {
                  const senderId = String(msg.sender?._id || msg.sender);
                  const currentUserId = String(localStorage.getItem("userId") || currentUser?.id || currentUser?._id || "");
                  const isSent = senderId === currentUserId;

                  return (
                    <div
                      key={msg._id || `msg-${Date.now()}-${Math.random()}`}
                      style={
                        isSent
                          ? styles.sentMsg
                          : styles.receivedMsg
                      }
                    >
                      {msg.content}
                    </div>
                  );
                })
              ) : (
                <div style={{ padding: 20, textAlign: 'center', color: '#666' }}>
                  No messages yet. Start the conversation!
                </div>
              )}
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
  backBtn: { background: "transparent", color: "#fff", border: "none", cursor: "pointer", fontSize: 18, padding: 0 },
  conversationsContainer: { display: "flex", flexDirection: "column", flex: 1, overflow: "hidden" },
  searchContainer: { padding: 12, borderBottom: "1px solid #eee", display: "flex", flexDirection: "column", gap: 8 },
  searchInput: { padding: 8, borderRadius: 6, border: "1px solid #ccc" },
  searchBtn: { padding: "8px 12px", borderRadius: 6, border: "none", background: "#0079D3", color: "#fff", cursor: "pointer", fontSize: "12px" },
  searchResults: { maxHeight: 150, overflowY: "auto", borderTop: "1px solid #eee", marginTop: 8 },
  userItem: { padding: 10, borderBottom: "1px solid #f0f0f0", cursor: "pointer" },
  conversationsList: { flex: 1, overflowY: "auto", display: "flex", flexDirection: "column" },
  conversationItem: { 
    padding: 12, 
    borderBottom: "1px solid #f0f0f0", 
    cursor: "pointer", 
    display: "flex", 
    justifyContent: "space-between",
    alignItems: "center",
    transition: "background-color 0.2s",
  },
  conversationInfo: { flex: 1, minWidth: 0 },
  conversationName: { fontWeight: "bold", marginBottom: 4, fontSize: "14px" },
  conversationPreview: { 
    fontSize: "12px", 
    color: "#666", 
    overflow: "hidden", 
    textOverflow: "ellipsis", 
    whiteSpace: "nowrap" 
  },
  conversationMeta: { display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4 },
  unreadBadge: { 
    background: "#0079D3", 
    color: "#fff", 
    borderRadius: "50%", 
    width: "20px", 
    height: "20px", 
    display: "flex", 
    alignItems: "center", 
    justifyContent: "center", 
    fontSize: "10px",
    fontWeight: "bold"
  },
  conversationTime: { fontSize: "10px", color: "#999" },
  messageContainer: { display: "flex", flexDirection: "column", flex: 1, padding: 12, overflow: "hidden" },
  messagesList: { flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: 8, paddingBottom: 8 },
  sentMsg: { alignSelf: "flex-end", background: "#DCF8C6", padding: "8px 12px", borderRadius: 16, maxWidth: "80%", wordWrap: "break-word" },
  receivedMsg: { alignSelf: "flex-start", background: "#F1F0F0", padding: "8px 12px", borderRadius: 16, maxWidth: "80%", wordWrap: "break-word" },
  inputContainer: { display: "flex", gap: 8, marginTop: 8 },
  messageInput: { flex: 1, padding: 8, borderRadius: 8, border: "1px solid #ccc" },
  sendBtn: { padding: "8px 12px", borderRadius: 8, border: "none", background: "#0079D3", color: "#fff", cursor: "pointer" },
};

export default FloatingChat;
