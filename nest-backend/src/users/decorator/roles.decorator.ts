import { SetMetadata } from "@nestjs/common";
import { Role } from "../enum/role.enum";

export const Roles = (...roles: Role[]) => {

    console.log("from rolesss", roles)

    return SetMetadata(
        'roles', roles
    )

}