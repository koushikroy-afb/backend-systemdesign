const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();

const USERS = path.join(__dirname, "data", "users.json");
const GROUPS = path.join(__dirname, "data", "groups.json");
const EXPENSES = path.join(__dirname, "data", "expenses.json");
const BALANCES = path.join(__dirname, "data", "balances.json");

// CREATE USER API
router.post("/user", (req, res) => {
  const { userId, name } = req.body;
  const users = JSON.parse(fs.readFileSync(USERS));

  users.push({ userId, name });
  fs.writeFileSync(USERS, JSON.stringify(users, null, 2));

  res.send("User created");
});


router.post("/group", (req, res) => {
  const { groupId, members } = req.body;
  const groups = JSON.parse(fs.readFileSync(GROUPS));

  groups.push({ groupId, members });
  fs.writeFileSync(GROUPS, JSON.stringify(groups, null, 2));

  res.send("Group created");
});

router.post("/expense", (req, res) => {
  const { paidBy, amount, participants } = req.body;

  const expenses = JSON.parse(fs.readFileSync(EXPENSES));
  const balances = JSON.parse(fs.readFileSync(BALANCES));

  const splitAmount = amount / participants.length;

  participants.forEach(user => {
    if (!balances[user]) balances[user] = 0;
    if (user === paidBy) {
      balances[user] += amount - splitAmount;
    } else {
      balances[user] -= splitAmount;
    }
  });

  expenses.push({ paidBy, amount, participants });
  fs.writeFileSync(EXPENSES, JSON.stringify(expenses, null, 2));
  fs.writeFileSync(BALANCES, JSON.stringify(balances, null, 2));

  res.send("Expense added and balances updated");
});

router.get("/balances", (req, res) => {
  const balances = JSON.parse(fs.readFileSync(BALANCES));
  res.json(balances);
});

router.post("/settle", (req, res) => {
  const { userId, amount } = req.body;
  const balances = JSON.parse(fs.readFileSync(BALANCES));

  balances[userId] += amount;
  fs.writeFileSync(BALANCES, JSON.stringify(balances, null, 2));

  res.send("Payment settled");
});

module.exports = router;
