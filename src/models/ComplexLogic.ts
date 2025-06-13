import { User } from "./User";

export class ComplexLogic {
  category: string;

  constructor(user: User) {
    let cat = "UNKNOWN";
    if (user.meta.region === "NA" && user.age > 25) {
      cat = "NORTH_ADULT";
    } else if (user.meta.verified) {
      cat = "VERIFIED_USER";
    }
    this.category = cat;
  }
}
