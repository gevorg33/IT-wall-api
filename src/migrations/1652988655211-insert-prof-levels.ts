import { MigrationInterface, QueryRunner } from 'typeorm';
import { ProfLevels } from '../common/constants/prof-levels';

export class InsertProfLevels1652988655211 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    let order = `INSERT INTO prof_levels ("name") VALUES `;
    Object.values(ProfLevels).forEach((item) => {
      order += ` ('${item}'), `;
    });
    order = order.substring(0, order.length - 2);
    await queryRunner.query(order);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DELETE FROM `prof_levels`');
  }
}
