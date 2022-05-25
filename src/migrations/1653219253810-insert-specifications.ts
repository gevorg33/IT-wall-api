import { MigrationInterface, QueryRunner } from 'typeorm';
import { Specifications } from '../common/constants/specifications';

export class InsertSpecifications1653219253810 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    let order = `INSERT INTO specifications ("name") VALUES `;
    Object.values(Specifications).forEach((item) => {
      order += ` ('${item}'), `;
    });
    order = order.substring(0, order.length - 2);
    await queryRunner.query(order);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DELETE FROM `specifications`');
  }
}
