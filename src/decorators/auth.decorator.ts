import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { ROLES_KEY } from '../guards/roles.decorator';
import { AtGuard, RolesGuard } from '../guards';

export const ADMIN = 'ADMIN';
/**
 * Содержит в себе все необходимые декораторы для настройки доступа к эндпоинту
 * @param roles Роли, требуемые для доступа к эндпоинту. Опционально
 * @returns Декораторы `SetMetadata(ROLES_KEY, roles)`, `UseGuards(AtGuard, RolesGuard)`, `ApiBearerAuth('jwt')`
 */
export function Auth(...roles: string[]) {
  return applyDecorators(SetMetadata(ROLES_KEY, roles), UseGuards(AtGuard, RolesGuard), ApiBearerAuth('jwt'));
}
