const router = require("express").Router();
let Highlights = require("../../models/Highlights");

router.post("/highlight", async (req, res) => {
  try {
    const { name, description } = req.body;
    const highlightsData = {
      name,
      description,
    };
    const highlight = await Highlights.create(highlightsData);
    return res.status(201).json(highlight);
  } catch (error) {
    return res.status(500).json({ error: error });
  }
});

// Get all highlights
router.get("/highlights", async (req, res) => {
    try {
        const highlights = await Highlights.find();
        return res.status(200).json(highlights);
    } catch (error) {
        return res.status(500).json({ error: error });
    }
});

// get one highlight
router.get("/highlight/:id", async (req, res) => {
  try {
    const _id = req.params.id;

    const highlight = await Highlights.findOne({ _id });
    if (!highlight) {
      return res
        .status(404)
        .json({ message: `Highlight with id ${_id} does not exist` });
    } else {
      return res.status(200).json(highlight);
    }
  } catch (error) {
    return res.status(500).json({ error: error });
  }
});

// delete one project
router.delete("/highlights/:id", async (req, res) => {
    try {
      const _id = req.params.id;
  
      const highlight = await Highlights.deleteOne({ _id });
  
      if (highlight.deletedCount === 0) {
        return res.status(404).json({ status: "failed" });
      } else {
        return res.status(204).json({ status: "success" });
      }
    } catch (error) {
      return res.status(500).json({ error: error });
    }
  });

module.exports = router;
