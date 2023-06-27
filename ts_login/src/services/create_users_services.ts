import bcrypt from 'bcrypt';
import User from '../model/user';
import CustomError from '../utils/cuserr';

interface UserService {
    createUser: (username: string, email: string, password: string) => Promise<User>;
}

const userService: UserService = {
    createUser: async (username, email, password) => {
        try {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            const newUser = await User.create({
                username,
                email,
                password: hashedPassword,
            });

            return newUser;
        } catch (error: any) {
            throw new CustomError(500, error.message);
        }
    },
};

export default userService;
