const db = require("./db-config");

module.exports = {
  getProjects,
  getProjectsById,
  getResources,
  addProject,
  addResource,
  getTasks,
  addTask,
};

function getProjects() {
  return db("Project");
}

function getProjectsById(id) {
  return db("Project").where({ id });
}

function addProject(newProject) {
  return db("Project")
    .insert(newProject, "id")
    .then(([id]) => {
      return getProjectsById(id);
    });
}

function getResources() {
  return db("Resource");
}

function addResource(newRe, id) {
  return db("Resource")
    .where({ project_id: id })
    .insert(newRe, "id")
    .then(([id]) => {
      return getProjectsById(id);
    });
}

function getTasks(id) {
  return db("Task").where({ project_id: id });
}

function addTask(newTask, id) {
  return db("Task")
    .where({ project_id: id })
    .insert(newTask, "id")
    .then(([id]) => {
      return getProjectsById(id);
    });
}
