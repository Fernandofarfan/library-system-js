import bcrypt from 'bcryptjs';

export async function hashPassword(password) {
    try {
        return await bcrypt.hash(password, parseInt('10'));
    } catch (error) {
        console.log(error);
    }
}

export async function compare_hashed_passwords(passwordInput, storedHashedPassword) {
    try {
        return await bcrypt.compare(passwordInput, storedHashedPassword);
    } catch (error) {
        console.log(error);
    }
}
