import * as bcrypt from 'bcrypt';
import { createHash } from 'crypto';

export const hashPassword = async (password: string): Promise<string> => {
  return await bcrypt.hash(password, 12);
};

export const verifyPassword = async (password: string, hash: string) => {
  const isPasswordMatch = await bcrypt.compare(password, hash);
  if (!isPasswordMatch) {
    throw new Error('Wrong credentials');
  }
};
export function generateGravatarUrl(email: string) {
  const baseUrl = 'https://gravatar.com/avatar';
  const query = 's=400&d=identicon';
  const hash = createHash('md5').update(email.toLowerCase()).digest('hex');
  return `${baseUrl}/${hash}?${query}`;
}
