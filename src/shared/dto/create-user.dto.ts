export class CreateUserDto {
  readonly name: string;
  readonly avatar: string;
  password: string;
  readonly isAdmin: boolean;
}
