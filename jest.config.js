const { getJestProjects } = require('@nrwl/jest');

module.exports = {
  projects: [
    ...getJestProjects(),
    '<rootDir>/apps/memory',
    '<rootDir>/libs/memory/feature-boardgame',
    '<rootDir>/libs/shared/util-kinetic',
    '<rootDir>/libs/shared/util-pot',
    '<rootDir>/libs/shared/util-drawing',
    '<rootDir>/apps/animations',
    '<rootDir>/libs/animations/feature-animation',
    '<rootDir>/apps/website',
  ],
};
