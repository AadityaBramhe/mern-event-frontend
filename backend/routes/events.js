const express = require("express");
const multer = require("multer");
const Event = require("../models/Event");
const auth = require("../middleware/auth");
const router = express.Router();

// ------------------ MULTER IMAGE UPLOAD ------------------
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (_, file, cb) => cb(null, Date.now() + file.originalname)
});
const upload = multer({ storage });

// ------------------ GET ALL EVENTS ------------------
router.get("/", async (_, res) => {
  try {
    const events = await Event.find().populate("creator");
    res.json(events);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

// ------------------ CREATE EVENT ------------------
router.post("/", auth, upload.single("image"), async (req, res) => {
  try {
    const event = await Event.create({
      ...req.body,
      image: req.file?.filename,
      creator: req.user.id
    });
    res.json(event);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

// ------------------ EDIT EVENT (OWNER ONLY) ------------------
router.put("/:id", auth, async (req, res) => {
  try {
    const event = await Event.findOne({ _id: req.params.id, creator: req.user.id });
    if (!event) return res.sendStatus(403);
    Object.assign(event, req.body);
    await event.save();
    res.json(event);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

// ------------------ DELETE EVENT (OWNER ONLY) ------------------
router.delete("/:id", auth, async (req, res) => {
  try {
    await Event.deleteOne({ _id: req.params.id, creator: req.user.id });
    res.sendStatus(204);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

// ------------------ CONCURRENCY-SAFE RSVP ------------------
router.post("/:id/rsvp", auth, async (req, res) => {
  try {
    const event = await Event.findOneAndUpdate(
      {
        _id: req.params.id,
        attendees: { $ne: req.user.id },
        $expr: { $lt: [{ $size: "$attendees" }, "$capacity"] }
      },
      { $addToSet: { attendees: req.user.id } },
      { new: true }
    );

    if (!event) return res.status(400).json({ msg: "Event full or already joined" });
    res.json(event);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

// ------------------ LEAVE EVENT ------------------
router.post("/:id/leave", auth, async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(
      req.params.id,
      { $pull: { attendees: req.user.id } },
      { new: true }
    );
    res.json(event);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
