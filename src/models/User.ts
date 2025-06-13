export class User {
  firstName!: string;
  lastName!: string;
  age!: number;
  meta = {
    verified: false,
    region: "NA",
  };
}
