import { IUserRepository } from "@/shared/domain/users/user.repository";
import { CreateUserDTO } from "../dto/create-user.dto";
import { IHashService } from "@/shared/domain/ports/hash.interface";
import { Password } from "@/shared/domain/users/password.vo";
import { User } from "@/shared/domain/users/user.entity";
import { Email } from "@/shared/domain/users/email.vo";
import { ConflictError } from "@/api/modules/errors/http-errors";
import { IUUIDService } from "@/shared/domain/ports/uuid.interface";

export class CreateUserUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly hashService: IHashService,
    private readonly uuidService: IUUIDService,
  ) {}

  async execute(input: CreateUserDTO): Promise<void> {
    const email = Email.create(input.email);

    if (await this.userRepository.findByEmail(email)) {
      throw new ConflictError("Email already exists");
    }

    const password = Password.create(input.password);

    const HashedPassword = await password.hash(this.hashService);

    const id = Bun.randomUUIDv7();

    await this.userRepository.save(
      User.create({ id, name: input.name, email, password: HashedPassword }),
    );
  }
}
