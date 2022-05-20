import { MigrationInterface, QueryRunner } from 'typeorm';
import timezones from 'timezones-list';

export class InsertRegions1653045719212 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    let order = `INSERT INTO regions ("name", "label", "tzCode", "utc") VALUES `;
    timezones.forEach((item) => {
      order += ` ('${item.name.replace(/'/g, '')}', '${item.label}', '${
        item.tzCode
      }', '${item.utc}'), `;
    });
    order = order.substring(0, order.length - 2);
    await queryRunner.query(order);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DELETE FROM `regions`');
  }
}
