import admin from "firebase-admin";

// Initialize the Firebase Admin SDK if not already initialized
if (!admin.apps.length) {
  const serviceAccount = require("../../nextjsnotification-aba04-firebase-adminsdk-vcxfl-38230f399d.json"); // Replace with the path to your service account JSON file
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

export default async function handler(req, res) {

    console.log("i am coming from like this ");
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { to, notification } = req.body;
  console.log(to);
  try {
    const response = await admin.messaging().send({
      token: to,
      notification: {
        title: notification.title,
        body: notification.body,
      },
    });

    res.status(200).json({ success: true, response });
  } catch (error) {
    console.error("Error sending notification:", error);
    res.status(500).json({ success: false, error: error.message });
  }
}
