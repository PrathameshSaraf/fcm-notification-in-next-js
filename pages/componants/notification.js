import { useEffect } from "react";

export default function Notification({ title, body, isVisible, onClose }) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000); // Auto-hide after 3 seconds
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  return (
    <div
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        maxWidth: "350px",
        backgroundColor: "white",
        color: "#333",
        borderRadius: "12px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        padding: "16px",
        transform: isVisible ? "translateY(0) scale(1)" : "translateY(20px) scale(0.95)",
        opacity: isVisible ? "1" : "0",
        transition: "opacity 0.5s ease, transform 0.5s ease",
        zIndex: 1000,
        pointerEvents: isVisible ? "auto" : "none",
      }}
    >
      <div style={{ position: "relative" }}>
        <button
          style={{
            position: "absolute",
            top: "8px",
            right: "8px",
            background: "none",
            border: "none",
            color: "#999",
            fontSize: "18px",
            cursor: "pointer",
          }}
          onClick={onClose}
          aria-label="Close Notification"
        >
          &times;
        </button>
        <h4 style={{ fontSize: "18px", fontWeight: "bold", margin: "0 0 8px" }}>{title}</h4>
        <p style={{ fontSize: "14px", color: "#666", margin: "0" }}>{body}</p>
      </div>
      <div
        style={{
          position: "absolute",
          bottom: "0",
          left: "0",
          width: "100%",
          height: "4px",
          background: "linear-gradient(to right, #4a90e2, #9013fe)",
          animation: "progress-bar 3s linear forwards",
        }}
      ></div>
      <style jsx>{`
        @keyframes progress-bar {
          from {
            width: 100%;
          }
          to {
            width: 0;
          }
        }
      `}</style>
    </div>
  );
}
