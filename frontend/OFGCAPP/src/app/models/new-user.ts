export class NewUser {
  name: string;
  email: string;
  password: string;
  confirm_password: string;

  constructor(name: string, email: string, password: string, confirm_password: string) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.confirm_password = confirm_password;
  }
}
