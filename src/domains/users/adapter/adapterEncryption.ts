import bcrypt from "bcryptjs";

interface AdapterEncryptionParams {
  bcrypt: typeof bcrypt;
}

export interface IAdapterEncryption {
  generateHashPassword(password: string): string;
  comparePasswords(password1: string, password2: string): boolean;
}

export class AdapterEncryption {
  private bcrypt: typeof bcrypt;

  constructor(params: AdapterEncryptionParams) {
    this.bcrypt = params.bcrypt;
  }

  public generateHashPassword(password: string): string {
    const SALT_ROUNDS = 10;
    const salt = this.bcrypt.genSaltSync(SALT_ROUNDS);
    const hash = this.bcrypt.hashSync(password, salt);

    return hash;
  }

  public comparePasswords(password1: string, password2: string): boolean {
    return this.bcrypt.compareSync(password1, password2);
  }
}
