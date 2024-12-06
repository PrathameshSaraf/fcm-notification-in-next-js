import { getMessaging, getToken } from "firebase/messaging";
import { initializeApp } from "firebase/app";
import localforage from "localforage";

const firebaseCloudMessaging = {
  tokenInlocalforage: async () => {
    return localforage.getItem("fcm_token");
  },

  init: async function () {
    initializeApp({
      apiKey: "AIzaSyB7c30ze2BDIuZWjjwtFW5NvtBZIpRkT80",
      authDomain: "nextjsnotification-aba04.firebaseapp.com",
      projectId: "nextjsnotification-aba04",
      storageBucket: "nextjsnotification-aba04.firebasestorage.app",
      messagingSenderId: "435203718719",
      appId: "1:435203718719:web:9f93b7d6b8b7bea1c9828a",
      measurementId: "G-1Y1SPGEQH6"
    });

    try {
      if ((await this.tokenInlocalforage()) !== null) {
        return false;
      }
      await Notification.requestPermission();
      const messaging = getMessaging();
      const token = await getToken(messaging, {
        vapidKey:
          "BLgR4Kdzxf_EW1XaZLsD6ai6w8XuqttYcKHwfx3wUW-5Gy48_rNnglCBlv5faotDU4636EiTVtGe4VAbNr3Nw2k",
      });
      localforage.setItem("fcm_token", token);
      console.log("fcm_token", token);
    } catch (error) {
      console.error(error);
    }
  },
};

export { firebaseCloudMessaging };
