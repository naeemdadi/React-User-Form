const express = require("express");
const router = new express.Router();
const User = require("../models/user.model");

router.post("/create", async (req, res) => {
  const newUser = new User(req.body);

  try {
    await newUser.save();
    res.status(201).send("User Added!");
  } catch (e) {
    res.status(401).send({ message: "Error! try again", e });
  }
});

router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).send(users);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.patch("/update/:id", async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = [
    "firstname",
    "lastname",
    "email",
    "dob",
    "description",
  ];
  const isValidOperator = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperator) {
    return res.status(400).send({ error: "Invalid updates!" });
  }

  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).send();
    }
    updates.forEach((update) => (user[update] = req.body[update]));
    await user.save();
    res.send(user);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const user = await User.findOneAndDelete(req.params.id);

    if (!user) {
      return res.status(404).send();
    }

    res.send(user);
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;
