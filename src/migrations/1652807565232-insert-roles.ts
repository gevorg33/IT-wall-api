import { MigrationInterface, QueryRunner } from 'typeorm';
import { UserRoles } from '../common/constants/user-roles';

export class InsertRoles1652807565232 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    let order = `INSERT INTO roles ("name", "createdAt") VALUES `;
    const roles = Object.values(UserRoles);
    roles.forEach((item, i) => {
      order += ` ('${item}', CURRENT_TIMESTAMP - INTERVAL '${
        roles.length - 1 - i
      }' SECOND), `;
    });
    order = order.substring(0, order.length - 2);
    await queryRunner.query(order);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DELETE FROM `roles`');
  }
}
