import argon2 from "argon2";

export async function encrypt(p: string): Promise<string> {
  const hashedP = await argon2.hash(p);
  return hashedP;
}

export async function matchedPassword(
  password: string,
  hash: string,
): Promise<boolean> {
  const isMatch = await argon2.verify(password, hash);
  return isMatch;
}
