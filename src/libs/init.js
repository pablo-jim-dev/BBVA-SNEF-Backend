import { Admin } from '../models/admin.model.js';
import { AdminUsers } from './adminUsers.js';
import bcrypt from "bcryptjs";

const createAdminUsers = async () => {
    try {
        if (await Admin.countDocuments() > 0) return;
        await Admin.insertMany(
            AdminUsers.map(user => ({
                email: user.email,
                password: bcrypt.hashSync(user.password, 10),
            }))
        );
        console.log('All Users created successfully')
    } catch (error) {
        console.error(error);
    }
}

export default createAdminUsers;