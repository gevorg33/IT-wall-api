import { MigrationInterface, QueryRunner } from 'typeorm';
import * as countryList from 'country-list';

export class InsertCountries1652985795611 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    let order = `INSERT INTO countries ("name", "code") VALUES `;
    countryList.getData().forEach((item) => {
      order += ` ('${item.name.replace(/'/g, '')}', '${item.code}'), `;
    });
    order = order.substring(0, order.length - 2);
    await queryRunner.query(order);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DELETE FROM `countries`');
  }
}
