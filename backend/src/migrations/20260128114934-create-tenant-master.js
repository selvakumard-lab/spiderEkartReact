// 'use strict';

// module.exports = {
//   async up(queryInterface, Sequelize) {
//     await queryInterface.createTable('tenant_master', {
//       tenant_id: {
//         type: Sequelize.INTEGER,
//         autoIncrement: true,
//         primaryKey: true
//       },
//       company_name: {
//         type: Sequelize.STRING,
//         allowNull: false
//       },
//       domain_name: {
//         type: Sequelize.STRING,
//         allowNull: false,
//         unique: true
//       },
//       plan_id: {
//         type: Sequelize.INTEGER,
//         allowNull: false
//       },
//       status: {
//         type: Sequelize.STRING,
//         defaultValue: 'active'
//       },
//       created_at: {
//         type: Sequelize.DATE,
//         defaultValue: Sequelize.NOW
//       },
//       updated_at: {
//         type: Sequelize.DATE,
//         defaultValue: Sequelize.NOW
//       }
//     });
//   },

//   async down(queryInterface, Sequelize) {
//     await queryInterface.dropTable('tenant_master');
//   }
// };


'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('tenant_master', {
      tenant_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },

      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },

      company_name: {
        type: Sequelize.STRING(150),
        allowNull: false
      },

      client_name: {
        type: Sequelize.STRING(150),
        allowNull: true
      },

      domain_name: {
        type: Sequelize.STRING(150),
        allowNull: false,
        unique: true
      },

      domain_url: {
        type: Sequelize.STRING(255),
        allowNull: true
      },

      project_slug: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true,
      },

      username: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true,
      },

      password: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },

      project_image: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },

      plan_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },

      start_date: {
        type: Sequelize.DATEONLY,
        allowNull: true
      },

      end_date: {
        type: Sequelize.DATEONLY,
        allowNull: true
      },

      status: {
        type: Sequelize.ENUM('active', 'inactive'),
        defaultValue: 'active'
      },

      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },

      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('tenant_master');
  }
};
