'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class TenantMaster extends Model {
    static associate(models) {
      // Example:
      // TenantMaster.hasMany(models.User, { foreignKey: 'tenant_id' });
    }
  }

  TenantMaster.init(
    {
      tenant_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },

      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      company_name: {
        type: DataTypes.STRING(150),
        allowNull: false
      },

      client_name: {
        type: DataTypes.STRING(150),
        allowNull: true
      },

      domain_name: {
        type: DataTypes.STRING(150),
        allowNull: false,
        unique: true
      },

      domain_url: {
        type: DataTypes.STRING(255),
        allowNull: true,
        field: 'domain_url',
      },

      project_slug: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
      },

      username: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
      },

      password: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },

      project_image: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },

      plan_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },

      start_date: {
        type: DataTypes.DATEONLY,
        allowNull: true
      },

      end_date: {
        type: DataTypes.DATEONLY,
        allowNull: true
      },

      status: {
        type: DataTypes.ENUM('active', 'inactive'),
        defaultValue: 'active'
      }
    },
    {
      sequelize,
      modelName: 'TenantMaster',
      tableName: 'tenant_master',
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  );

  return TenantMaster;
};
