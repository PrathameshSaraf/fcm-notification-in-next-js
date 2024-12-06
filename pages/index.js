import { useState } from "react";

import { getMessaging, getToken } from "firebase/messaging";
import { firebaseCloudMessaging } from "../utils/webPush";

export default function Home() {
  const [fcmToken, setFcmToken] = useState("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [response, setResponse] = useState("");

  // Function to get the FCM token
  const fetchFcmToken = async () => {
    try {
      await firebaseCloudMessaging.init();
      const messaging = getMessaging();
      const token = await getToken(messaging, {
        vapidKey: "BLgR4Kdzxf_EW1XaZLsD6ai6w8XuqttYcKHwfx3wUW-5Gy48_rNnglCBlv5faotDU4636EiTVtGe4VAbNr3Nw2k", // Replace with your VAPID key
      });
      if (token) {
        console.log("FCM Token:", token); 
        setFcmToken(token);
      } else {
        console.error("Failed to fetch FCM token.");
      }
    } catch (error) {
      console.error("Error fetching FCM token:", error);
    }
  };

  // Function to send notification
  const sendNotification = async () => {
    if (!fcmToken) {
      alert("Fetch FCM token first!");
      return;
    }

    const notificationData = {
      to: fcmToken,
      notification: {
        title,
        body,
      },
    };

    try {
      const res = await fetch("/api/notify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(notificationData),
      });
      const data = await res.json();
      setResponse(data);
      console.log("Notification sent successfully:", data);
         console.log(`Title: ${title}`);
    console.log(`Body: ${body}`);
    console.log("Response:", data);
    } catch (error) {
      console.error("Error sending notification:", error);
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>FCM Notification Sender</h1>
      <div style={{ marginBottom: "20px" }}>
        <button onClick={fetchFcmToken} style={{ padding: "10px", fontSize: "16px" }}>
          Get FCM Token
        </button>
        {fcmToken && (
          <div style={{ marginTop: "10px", wordBreak: "break-word" }}>
            <strong>FCM Token:</strong> {fcmToken}
          </div>
        )}
      </div>

      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Notification Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{
            padding: "10px",
            marginBottom: "10px",
            width: "100%",
            fontSize: "16px",
          }}
        />
        <textarea
          placeholder="Notification Body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          style={{
            padding: "10px",
            width: "100%",
            fontSize: "16px",
            height: "100px",
          }}
        />
      </div>

      <button onClick={sendNotification} style={{ padding: "10px", fontSize: "16px" }}>
        Send Notification
      </button>

      {response && (
        <div style={{ marginTop: "20px", color: "green" }}>
          <strong>Response:</strong> {JSON.stringify(response)}
        </div>
      )}
    </div>
  );
}
