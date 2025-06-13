import { User } from "./User";

export class MapModel {
  result: string;

  constructor(user: User) {
    const parts = [user.firstName, user.meta.region, user.lastName];
    this.result = parts.map((x) => x.toUpperCase()).join("::");
  }
}
