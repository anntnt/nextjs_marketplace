export type PostgresToGraphql<
  PostgresEntity extends { id: number } | undefined,
> = PostgresEntity extends undefined
  ? null
  : Omit<PostgresEntity, 'id'> & { id: string };

export function postgresToGraphql<Entity extends { id: number } | undefined>(
  entity: Entity,
) {
  if (!entity) return null as PostgresToGraphql<Entity>;

  return {
    ...entity,
    id: String(entity.id),
  };
}
