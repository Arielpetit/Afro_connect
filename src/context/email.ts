// import * as functions from "firebase-functions";
// import * as admin from "firebase-admin";
// import * as nodemailer from "nodemailer";

// admin.initializeApp();

// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: functions.config().gmail.email,
//     pass: functions.config().gmail.password,
//   },
// });

// export const sendContactEmail = functions.firestore
//   .document("contactRequests/{requestId}")
//   .onCreate(async (snapshot, context) => {
//     const data = snapshot.data();

//     const mailOptions = {
//       from: "Your App <noreply@yourapp.com>",
//       to: data.professionalEmail,
//       subject: "New Contact Request",
//       html: `
//         <h2>New Contact Request</h2>
//         <p><strong>From:</strong> ${data.name} (${data.email})</p>
//         <p><strong>Message:</strong></p>
//         <p>${data.message}</p>
//       `,
//     };

//     try {
//       await transporter.sendMail(mailOptions);
//       await snapshot.ref.update({ status: "sent" });
//     } catch (error) {
//       console.error("Error sending email:", error);
//       await snapshot.ref.update({ status: "error" });
//     }
//   });
