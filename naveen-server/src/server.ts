import { Server } from 'http';
import app from './app';
import { config } from './config';

let server: Server;

async function main() {
  try {
    server = app.listen(config.port, () => {
      console.log(`App is listening at port ${config.port}`);
    });
  } catch (error) {
    console.log(error);
  }
}

main();

process.on('unhandledRejection', () => {
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

process.on('uncaughtException', () => {
  process.exit(1);
});
