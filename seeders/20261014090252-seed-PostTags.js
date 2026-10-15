"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    let data = require("../data/posttags.json");
    data = data.map((el) => {
      delete el.id;
      return el;
    });
    await queryInterface.bulkInsert("PostTags", data);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("PostTags", null, {});
  },
};
