export class CreateUserDto {
  readonly name: string;
  readonly avatar: string;
  readonly password: string;
  readonly isAdmin: boolean;
}
