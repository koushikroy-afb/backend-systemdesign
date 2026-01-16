const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();

const SUB_FILE = path.join(__dirname, "data", "subscriptions.json");
const NOTIF_FILE = path.join(__dirname, "data", "notifications.json");

/**
 * SUBSCRIBE API
 */
router.post("/subscribe", (req, res) => {
  console.log("SUBSCRIBE API HIT");
  console.log(req.body);

  const { userId, itemId, channels } = req.body;

  const subs = JSON.parse(fs.readFileSync(SUB_FILE, "utf-8"));

  subs.push({
    userId,
    itemId,
    channels,
    status: "SUBSCRIBED"
  });

  fs.writeFileSync(SUB_FILE, JSON.stringify(subs, null, 2));
  res.send("Subscribed successfully");
});

/**
 * RESTOCK API
 */
router.post("/restock", (req, res) => {
  const { itemId } = req.body;

  const subs = JSON.parse(fs.readFileSync(SUB_FILE, "utf-8"));
  const notifs = JSON.parse(fs.readFileSync(NOTIF_FILE, "utf-8"));

  subs.forEach(sub => {
    if (sub.itemId === itemId && sub.status !== "NOTIFIED") {
      notifs.push({
        userId: sub.userId,
        itemId,
        channels: sub.channels,
        message: "Item back in stock"
      });

      sub.status = "NOTIFIED";
    }
  });

  fs.writeFileSync(SUB_FILE, JSON.stringify(subs, null, 2));
  fs.writeFileSync(NOTIF_FILE, JSON.stringify(notifs, null, 2));

  res.send("Notifications generated");
});

module.exports = router;

