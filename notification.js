// // services/notificationService.js
// const Notification = require('../models/Notification');
// const Tender = require('../models/Tender');

// const sendTenderStatusChangeNotification = async (tenderId, status) => {
//   const tender = await Tender.findById(tenderId);
//   if (!tender) throw new Error('Tender not found');

//   const message = `The tender "${tender.name}" status has changed to ${status}.`;
  
//   // Find all users who should be notified
//   // Assuming you have a way to get all users, for simplicity let's use a placeholder function
//   const users = await getUsersToNotify(); // Implement this function as needed

//   for (const user of users) {
//     await new Notification({
//       userId: user._id,
//       message
//     }).save();
//   }
// };

// const notifyNewTenderPlaced = async () => {
//   const now = new Date();
//   const fiveMinutesAgo = new Date(now.getTime() - 5 * 60 * 1000);

//   const recentTenders = await Tender.find({ createdAt: { $gte: fiveMinutesAgo } });

//   for (const tender of recentTenders) {
//     const message = `A new tender "${tender.name}" has been placed recently.`;

//     // Find all users who should be notified
//     const users = await getUsersToNotify(); // Implement this function as needed

//     for (const user of users) {
//       await new Notification({
//         userId: user._id,
//         message
//       }).save();
//     }
//   }
// };

// module.exports = { sendTenderStatusChangeNotification, notifyNewTenderPlaced };


// // services/notificationService.js
// const Notification = require('../models/Notification');
// const Tender = require('../models/Tender');
// const User = require('../models/User'); // Assuming you have a User model

// const sendTenderStatusChangeNotification = async (tenderId, status) => {
//   const tender = await Tender.findById(tenderId);
//   if (!tender) throw new Error('Tender not found');

//   const message = `The tender "${tender.name}" status has changed to ${status}.`;
  
//   // Find all users who should be notified
//   const users = await User.find(); // Implement a filter if needed

//   for (const user of users) {
//     await new Notification({
//       userId: user._id,
//       message
//     }).save();
//   }
// };

// const notifyNewTenderPlaced = async () => {
//   const now = new Date();
//   const fiveMinutesAgo = new Date(now.getTime() - 5 * 60 * 1000);

//   const recentTenders = await Tender.find({ createdAt: { $gte: fiveMinutesAgo } });

//   for (const tender of recentTenders) {
//     const message = `A new tender "${tender.name}" has been placed recently.`;

//     // Find all users who should be notified
//     const users = await User.find(); // Implement a filter if needed

//     for (const user of users) {
//       await new Notification({
//         userId: user._id,
//         message
//       }).save();
//     }
//   }
// };

// module.exports = { sendTenderStatusChangeNotification, notifyNewTenderPlaced };
