import bcryptjs from 'bcryptjs';

export const encryptPassword = async (password: string) => {
  const salt = bcryptjs.genSaltSync();
  return bcryptjs.hashSync(password, salt);
};
