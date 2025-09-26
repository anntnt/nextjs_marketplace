import upleveled from 'eslint-config-upleveled';

const config = upleveled.map((entry) => {
  if (!entry?.rules) {
    return entry;
  }

  return {
    ...entry,
    rules: {
      ...entry.rules,
      '@ts-safeql/check-sql': 'off',
    },
  };
});

export default config;
