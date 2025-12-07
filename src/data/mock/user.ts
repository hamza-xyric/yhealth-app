import type { User } from "@/types";

export const mockUser: User = {
  id: "user-1",
  name: "Alex Johnson",
  firstName: "Alex",
  lastName: "Johnson",
  avatarUrl: undefined, // Will use fallback initials
};