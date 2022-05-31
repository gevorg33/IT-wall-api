import { Controller, Get } from '@nestjs/common';
import { RoleService } from './role.service';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { RolesListType } from './types/roles-list.type';

@Controller('roles')
@ApiTags('Roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Get('/')
  @ApiOperation({ summary: 'Get Roles' })
  @ApiOkResponse({ type: RolesListType })
  async getRoles(): Promise<RolesListType> {
    const roles = await this.roleService.getRoles();
    return { roles };
  }
}
