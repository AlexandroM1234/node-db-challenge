const db = require("./db-config");

module.exports = {
  getProjects,
  getProjectsById,
  getResources,
  addProject,
  addResource,
};

function getProjects() {
  return db("Projects");
}

function getProjectsById(id) {
  return db("Projects").where({ id });
}

function addProject(newProject) {
  return db("Projects")
    .insert(newProject, "id")
    .then(([id]) => {
      return getProjectsById(id);
    });
}

function getResources(id) {
  return db("Resources");
}

function addResource(newRe, id) {
  return db("Resources")
    .where({ project_id: id })
    .insert(newRe, "id")
    .then(([id]) => {
      return getProjectsById(id);
    });
}
