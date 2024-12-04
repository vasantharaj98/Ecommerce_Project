require('dotenv').config();

module.exports = {
    secret: process.env.SECRET,
    jwtExpiration: process.env.JWTEXPIRATION,           // 1 hour
    jwtRefreshExpiration: process.env.JWTREFRESHEXPIRATION,    // 24 hours

    
  /* for test */
//   jwtExpiration: 60,          // 1 minute
//   jwtRefreshExpiration: 120,  // 2 minutes
  };