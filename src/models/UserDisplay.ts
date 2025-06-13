import { UserView } from "./UserView";

function deriveStatus(isAdult: boolean): string {
  return isAdult ? "Adult" : "Minor";
}

export class UserDisplay {
  nameLabel: string;
  statusLabel: string;

  constructor(view: UserView) {
    const temp = view.fullName;
    this.nameLabel = temp.toUpperCase();
    const status = deriveStatus(view.isAdult);
    this.statusLabel = status;
  }
}
