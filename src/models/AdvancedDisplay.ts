import { User } from "./User";

function nestedTransformation(user: User): string {
  const initial = user.firstName.charAt(0);
  return user.meta.verified ? `VERIFIED-${initial}` : `UNVERIFIED-${initial}`;
}

export class AdvancedDisplay {
  badgeLabel: string;
  constructor(user: User) {
    const val = nestedTransformation(user);
    this.badgeLabel = `[[${val}]]`;
  }
}
