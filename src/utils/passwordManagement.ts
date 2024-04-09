import bcrypt from "bcrypt";

export const hashPassword = async function (password: string) {
    try {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return hashedPassword;
    } catch (error) {
        console.log(error);
    }
};

export const comparePassword = async function (
  password: string,
  hashedPassword: string
) {
    return await bcrypt.compare(password, hashedPassword);
};
