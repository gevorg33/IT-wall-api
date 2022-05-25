import { MigrationInterface, QueryRunner } from 'typeorm';
import { Categories } from '../common/constants/categories';

export class InsertCategories1653159388806 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    let order = `INSERT INTO categories ("name") VALUES `;
    Object.values(Categories).forEach((item) => {
      order += ` ('${item}'), `;
    });
    order = order.substring(0, order.length - 2);
    await queryRunner.query(order);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DELETE FROM `categories`');
  }
}
