"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addConstraint("PostTags", {
      fields: ["PostId", "TagId"],
      type: "unique",
      name: "unique_post_tag",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint("PostTags", "unique_post_tag");
  },
};
