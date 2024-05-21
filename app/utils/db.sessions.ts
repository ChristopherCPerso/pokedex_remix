import { users } from "@prisma/client";
import { createCookieSessionStorage, redirect } from "@remix-run/node";

export interface Session {
  user: Omit<users, "email">;
}

export const { getSession, commitSession, destroySession } =
  createCookieSessionStorage({
    cookie: {
      name: "__session",
      domain: "localhost",
      httpOnly: true,
      maxAge: 3600 * 24 * 7,
      path: "/",
      sameSite: "lax",
      secrets: ["s3cret1"],
      secure: true,
    },
  });

async function _getSession(request: Request) {
  return await getSession(request.headers.get("Cookie"));
}

export async function getConnectedUser(request: Request) {
  const session = await _getSession(request);
  const user = await session.get("email");
  return user;
}

export async function logout(request: Request) {
  const session = await _getSession(request);

  return redirect("/", {
    headers: { "Set-Cookie": await destroySession(session) },
  });
}
