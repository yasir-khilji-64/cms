import * as bcrypt from 'bcrypt';

export const hashPassword = async (password: string): Promise<string> => {
  return await bcrypt.hash(password, 12);
};

export const verifyPassword = async (password: string, hash: string) => {
  const isPasswordMatch = await bcrypt.compare(password, hash);
  if (!isPasswordMatch) {
    throw new Error('Wrong credentials');
  }
};
