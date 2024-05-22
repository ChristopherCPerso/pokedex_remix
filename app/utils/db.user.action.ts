import { PrismaClient } from "@prisma/client";
import { encrypt, matchedPassword } from "./hash";
const prisma = new PrismaClient();

export async function addUser(
  username: string,
  email: string,
  password: string,
) {
  const user = await prisma.users.create({
    data: {
      username: username,
      email: email,
      password: await encrypt(password),
      profil_picture: "profilpict.png",
      created_at: new Date(),
      updated_at: new Date(),
    },
  });
  return user;
}

export async function changePassword(email: string, password: string) {
  const newpassword = await prisma.users.update({
    where: {
      email: email,
    },
    data: {
      password: await encrypt(password),
      updated_at: new Date(),
    },
  });
  return newpassword;
}

export async function login(email: string, password: string) {
  const user = await prisma.users.findUnique({
    where: {
      email: email,
    },
  });

  const isPasswordMatch = await matchedPassword(user!.password, password);
  if (!isPasswordMatch) {
    throw new Error("Mot de passe ou email invalide");
  }
  return user;
}

export async function getAllUsers() {
  const allUsers = await prisma.users.findMany();
  return allUsers;
}

export async function getUserByEmail(email: string) {
  const user = await prisma.users.findUnique({
    where: {
      email: email,
    },
  });

  return user;
}
