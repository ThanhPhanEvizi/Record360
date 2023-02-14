export const randomTrueOrFalse = () => {
  return Math.floor(Math.random() * 2);
};

export const randomNumberRanges = (target: number) => {
  return Math.floor(Math.random() * target);
};

export const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const checkPermissions = (authorities: string, roles: string[] = []) => {
  if (!roles.length) return true;
  const index = roles?.indexOf(authorities);
  if (index >= 0) {
    return true;
  }
  return false;
};
