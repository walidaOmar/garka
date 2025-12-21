import mongoose from 'mongoose';
import { logger } from '../utils/logger.js';

const connectDB = async () => {
  const uri = process.env.MONGODB_URI || process.env.MONGO_URI;
  logger.info(`Attempting to connect to MongoDB (${uri ? (uri.includes('mongodb+srv') ? 'mongodb+srv' : 'mongodb') : 'no URI set'})`);
  const maxRetries = 5;
  let attempt = 0;

  while (attempt < maxRetries) {
    try {
      // Prefer IPv4: replace 'localhost' with '127.0.0.1' (helps when Node prefers IPv6)
      const preparedUri = uri && uri.includes('localhost') ? uri.replace('localhost', '127.0.0.1') : uri;
      const connectOptions = { family: 4 };
      const conn = await mongoose.connect(preparedUri, connectOptions);
      logger.info(`MongoDB Connected: ${conn.connection.host} (forced IPv4)`);

      mongoose.connection.on('error', (err) => {
        logger.error(`MongoDB connection error: ${err}`);
      });

      mongoose.connection.on('disconnected', () => {
        logger.warn('MongoDB disconnected');
      });

      process.on('SIGINT', async () => {
        await mongoose.connection.close();
        process.exit(0);
      });

      return;
    } catch (error) {
      attempt += 1;
      logger.error(`MongoDB connection attempt ${attempt} failed: ${error.message}`);
      if (attempt < maxRetries) {
        logger.info(`Retrying MongoDB connection in 5s (${attempt}/${maxRetries})`);
        // eslint-disable-next-line no-await-in-loop
        await new Promise((r) => setTimeout(r, 5000));
        continue;
      }

      logger.warn('MongoDB unavailable after multiple attempts; attempting to start an in-memory MongoDB instance for development.');

      // Development fallback: try an in-memory mongo server for local development
      try {
        // eslint-disable-next-line global-require
        const { MongoMemoryServer } = await import('mongodb-memory-server');
        const mongod = await MongoMemoryServer.create();
        const memUri = mongod.getUri();
        await mongoose.connect(memUri);
        logger.info('Connected to in-memory MongoDB (mongodb-memory-server)');

        // Ensure the memory server stops when process exits
        process.on('SIGINT', async () => {
          await mongoose.connection.close();
          await mongod.stop();
          process.exit(0);
        });

        return;
      } catch (memErr) {
        logger.error(`Failed to start in-memory MongoDB: ${memErr.message}`);
        logger.warn('Continuing without DB. Some features will be disabled until DB is available.');
        return;
      }
    }
  }
};

export default connectDB;
