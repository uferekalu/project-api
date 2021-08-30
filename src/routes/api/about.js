const router = require("express").Router();
let About = require("../../models/About");

// create one about
router.post("/about", async (req, res) => {
  try {
    const { projects } = req.body;

    const about = await About.create({
        projects
    });
    console.log(about)
    return res.status(201).json(about);
  } catch (error) {
    return res.status(500).json({ error: error });
  }
});

// get one about
router.get("/about", async (req, res) => {
  try {
    const about = await About.find();
    return res.status(200).json(about);
  } catch (error) {
    return res.status(500).json({ error: error });
  }
});

module.exports = router;
