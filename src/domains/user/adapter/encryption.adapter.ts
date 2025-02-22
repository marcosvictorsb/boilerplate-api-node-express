import bcrypt from "bcryptjs";

interface EncryptionParams {
  bcrypt: typeof bcrypt;
}

export interface IEncryption {
  generateHashPassword(password: string): string;
  comparePasswords(password1: string, password2: string): boolean;
}

export class EncryptionAdapter implements IEncryption {
  private bcrypt: typeof bcrypt;

  constructor(params: EncryptionParams) {
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