import { SelectQueryBuilder } from 'typeorm';

export async function paginate<T>(
  queryBuilder: SelectQueryBuilder<T>,
  page: number,
  limit: number,
): Promise<[T[], number]> {
  const [items, count] = await queryBuilder
    .take(limit)
    .skip((page - 1) * limit)
    .getManyAndCount();

  return [items, count];
}
