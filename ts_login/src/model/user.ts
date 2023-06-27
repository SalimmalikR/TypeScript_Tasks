import { DataTypes, Model, Optional } from 'sequelize';
import sequelizeConnection from '../config/database';

interface UserAttributes {
  id?: number | null;
  username: string;
  email: string;
  password: string;
}

export interface UserInput extends Optional<UserAttributes, 'id'> {}
export interface UserOutput extends Required<UserAttributes> {}

class User extends Model<UserAttributes, UserInput> implements UserAttributes {
    static updateUser(id: string, email: any, username: any, password: any, emailid: any) {
        throw new Error('Method not implemented.');
    }
  public id!: number;
  public username!: string;
  public email!: string;
  public password!: string;
    static email: any;
    static password: any;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    tableName: 'users',
    freezeTableName: true,
    sequelize: sequelizeConnection,
  }
);

export default User;
