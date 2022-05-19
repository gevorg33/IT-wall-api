import { MigrationInterface, QueryRunner } from 'typeorm';
import * as lngList from 'language-list';
const languages = lngList();

export class InsertLanguages1652982595637 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    let order = `INSERT INTO languages ("name", "code") VALUES `;
    languages.getData().forEach((item) => {
      order += ` ('${item.language}', '${item.code}'), `;
    });
    order = order.substring(0, order.length - 2);
    await queryRunner.query(order);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DELETE FROM `languages`');
  }
}
