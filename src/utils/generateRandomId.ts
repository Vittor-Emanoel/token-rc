export const generateRandomId = () =>
  `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
