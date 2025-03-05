const bcrypt = require('bcryptjs');
bcrypt.hash('Cipriano5cn.23', 10).then(hash => {
  console.log(hash);
});
