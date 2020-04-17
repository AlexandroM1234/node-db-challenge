const express = require("express");

const Projects = require("./project-model");

const router = express.Router();

router.get("/", (req, res) => {
  Projects.getProjects().then((projects) => {
    res.status(200).json(projects);
  });
});

router.post("/", (req, res) => {
  const newProject = req.body;

  Projects.addProject(newProject).then((project) => {
    res.status(201).json(project);
  });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  Projects.getProjectsById(id).then((project) => {
    res.status(200).json(project);
  });
});

router.get("/:id/resources", (req, res) => {
  const { id } = req.params;
  Projects.getResources()
    .where({ project_id: id })
    .then((resources) => {
      res.status(200).json(resources);
    });
});

router.post("/:id/resources", (req, res) => {
  const { id } = req.params;
  const newRes = req.body;
  Projects.addResource(newRes, id).then((post) => {
    res.status(201).json({ message: "resource made" });
  });
});
module.exports = router;
