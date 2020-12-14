const app = require('./app');
const config = require('config');
const { userRouterAPI } = require('./components/user');
const { loginRouterAPI, loginService } = require('./components/login');
const { studentAPI } = require('./components/student');

app.use('/users', userRouterAPI);
app.use('/login', loginRouterAPI);

app.use(loginService.authenticateRequest);
app.use('/students', studentAPI);

const port = config.get('server').port;

app.listen(
  port,
  () => {
    console.log(`Server is running on port ${port}`);
  }
);
