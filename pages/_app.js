import { useEffect, useState } from "react";
import { getMessaging, onMessage } from "firebase/messaging";
import { firebaseCloudMessaging } from "../utils/webPush";
import "../styles/globals.css";
import Notification from "./componants/notification";

function MyApp({ Component, pageProps }) {
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    const initializeFCM = async () => {
      try {
        await firebaseCloudMessaging.init();
        const messaging = getMessaging();

        onMessage(messaging, (payload) => {
          console.log("Message received: ", payload);
          setNotification({
            title: payload.notification.title,
            body: payload.notification.body,
          });
        });
      } catch (error) {
        console.error("Error in FCM initialization:", error);
      }
    };

    initializeFCM();
  }, []);

  const handleCloseNotification = () => {
    setNotification(null);
  };

  return (
    <>
      <Component {...pageProps} />
      {notification && (
        <Notification
          title={notification.title}
          body={notification.body}
          isVisible={!!notification}
          onClose={handleCloseNotification}
        />
      )}
    </>
  );
}

export default MyApp;
