import { IUUIDService } from "@/shared/domain/ports/uuid.interface";

export class BunV7UUIDService implements IUUIDService {
  generate(): string {
    return Bun.randomUUIDv7("hex");
  }
}
