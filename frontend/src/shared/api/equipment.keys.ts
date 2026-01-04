export const equipmentKeys = {
  all: ['equipment'] as const,
  list: () => [...equipmentKeys.all, 'list'] as const,
};
