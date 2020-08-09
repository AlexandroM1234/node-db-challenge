exports.up = function (knex) {
  return knex.schema
    .createTable("Project", (tbl) => {
      tbl.increments();
      tbl.string("ProjectName").notNullable();
      tbl.string("Description");
      tbl.boolean("Completed").notNullable().defaultTo(false);
    })
    .createTable("Resource", (tbl) => {
      tbl.increments();
      tbl.string("ResourceName").notNullable().unique();
      tbl.string("Description");

      tbl
        .integer("project_id")
        .notNullable()
        .references("id")
        .inTable("Project")
        .onDelete("RESTRICT")
        .onUpdate("CASCADE");
    })
    .createTable("Task", (tbl) => {
      tbl.increments();
      tbl.string("TaskDescription").notNullable();
      tbl.string("Notes");
      tbl.boolean("TaskCompleted").notNullable().defaultTo(false);

      tbl
        .integer("project_id")
        .notNullable()
        .references("id")
        .inTable("Project")
        .onDelete("RESTRICT")
        .onUpdate("CASCADE");
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists("Task")
    .dropTableIfExists("Resource")
    .dropTableIfExists("Project");
};
