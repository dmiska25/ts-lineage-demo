export class User {
  firstName: string;
  lastName: string;
  age: number;
  meta = {
    verified: false,
    region: "NA",
  };

  constructor(firstName: string, lastName: string, age: number) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
  }
}
