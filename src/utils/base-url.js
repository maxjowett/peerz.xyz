export const createUrl = () => {
  return process.env.NODE_ENV === 'production'
    ? 'https://api.peerz.xyz'
    : 'http://localhost:8080';
};
