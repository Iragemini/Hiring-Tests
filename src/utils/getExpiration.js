/**
 * Get expiration in seconds
 *
 * @param {number} ttl
 * @returns {number} Returns expiry in seconds
 */
const getExpiration = (ttl) => {
  let expiry = null;

  if (ttl > 0) {
    expiry = ttl * 1000 + Date.now();
  }

  return expiry;
};

export default getExpiration;
