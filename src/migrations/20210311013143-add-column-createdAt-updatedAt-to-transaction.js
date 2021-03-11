module.exports = {
  up: async (queryInterface, Sequelize) => {
    return [
      await queryInterface.addColumn('transactions', 'createdAt', {
        type: Sequelize.DATE,
      }),
      await queryInterface.addColumn('transactions', 'updatedAt', {
        type: Sequelize.DATE,
      }),
    ];
  },

  down: async (queryInterface, Sequelize) => {
    return [
      await queryInterface.removeColumn('transactions', 'createdAt'),
      await queryInterface.removeColumn('transactions', 'updatedAt'),
    ];
  },
};
