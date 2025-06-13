import { User } from "./User";

function formatFullName(user: User): string {
  return user.firstName.toUpperCase() + " " + user.lastName.toLowerCase();
}

export class UserView {
  fullName: string;
  isAdult: boolean;
  regionCode: string;

  constructor(user: User) {
    const tempName = formatFullName(user);
    this.fullName = `[${tempName}]`;
    const adult = user.age >= 18;
    this.isAdult = adult;
    this.regionCode = user.meta.region;
  }
}
