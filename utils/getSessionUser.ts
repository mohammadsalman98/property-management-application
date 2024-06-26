import { getServerSession } from "next-auth";
import { authOptions } from "./authOptions";

export default async function getSessionUser() {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) return null;
    return {
      user: session.user as String,
      userId: session.user.id as String,
    };
  } catch (error) {
    console.error(error);
    return null;
  }
}
