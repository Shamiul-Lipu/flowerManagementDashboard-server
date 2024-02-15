import config from "../config";
import { User } from "../modules/user/use.model";
import { USER_ROLE } from "../modules/user/user.interface";

const superAdminAsManager = {
  username: "manager",
  email: "manager@superAdmin.com",
  password: config.manager_password,
  role: USER_ROLE.manager,
};

const seedSuperAdminAsManager = async () => {
  const isSuperAdminExists = await User.findOne({ role: USER_ROLE.manager });

  if (!isSuperAdminExists) {
    await User.create(superAdminAsManager);
  }
};

export default seedSuperAdminAsManager;
