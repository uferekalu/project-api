const router = require("express").Router();
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
let path = require("path");
let Project = require("../../models/Project");

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "images");
    },
    filename: function(req, file, cb) {
        cb(null, uuidv4() + "-" + Date.now() + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    const allowedFileTypes = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/gif"
    ];
    if (allowedFileTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

let upload = multer({ storage, fileFilter });

// Create a project
router.route("/add").post(upload.single("img"), (req, res) => {
    const name = req.body.name;
    const weburl = req.body.weburl;
    const webtitle = req.body.webtitle;
    const repourl = req.body.repourl;
    const repotitle = req.body.repotitle;
    const description = req.body.description;
    const img = req.file.filename;

    const newProjectData = {
        name,
        weburl,
        webtitle,
        repourl,
        repotitle,
        description,
        img
    };

    const newProject = new Project(newProjectData);

    newProject
        .save()
        .then(() => res.json("Project Added"))
        .catch(err => res.status(400).json("Error: " + err));
});

// Get all projects
router.get("/projects", async (req, res) => {
    try {
        const projects = await Project.find();
        return res.status(200).json(projects);
    } catch (error) {
        return res.status(500).json({ error: error });
    }
});

// get one project
router.get("/project/:id", async (req, res) => {
    try {
        const _id = req.params.id;

        const project = await Project.findOne({ _id });
        if (!project) {
            return res.status(404).json({});
        } else {
            return res.status(200).json(project);
        }
    } catch (error) {
        return res.status(500).json({ error: error });
    }
});

// update one project
router.put("/project/:id", async (req, res) => {
    try {
        const _id = req.params.id;
        const name = req.body.name;
        const weburl = req.body.weburl;
        const webtitle = req.body.webtitle;
        const repourl = req.body.repourl;
        const repotitle = req.body.repotitle;
        const description = req.body.description;
        const img = req.file.filename;

        let project = await Project.findOne({ _id });
        if (!project) {
            project = await Project.create({
                name,
                weburl,
                webtitle,
                repourl,
                repotitle,
                description,
                img
            });
            return res.status(201).json(project);
        } else {
            project.name = name;
            project.weburl = weburl;
            project.webtitle = webtitle;
            project.repourl = repourl;
            project.repotitle = repotitle;
            project.description = description;
            project.img = img;
            await project.save();
            return res.status(200).json(project);
        }
    } catch (error) {
        return res.status(500).json({ error: error });
    }
});

// delete one project
router.delete("/project/:id", async (req, res) => {
    try {
      const _id = req.params.id;
  
      const project = await Project.deleteOne({ _id });
  
      if (project.deletedCount === 0) {
        return res.status(404).json({ status: "failed" });
      } else {
        return res.status(204).json({ status: "success" });
      }
    } catch (error) {
      return res.status(500).json({ error: error });
    }
  });

module.exports = router;
