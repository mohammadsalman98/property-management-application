import { Image } from "next/image";
import "next-auth";
import "react";

declare module "next-auth" {
  interface Profile {
    picture?: string;
  }
  interface Session extends DefaultSession {
    user?: {
      id?: string | null;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    } & DefaultSession["user"];
  }
}
