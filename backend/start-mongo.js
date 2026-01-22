import { MongoMemoryServer } from 'mongodb-memory-server';
import fs from 'fs';

async function start() {
  const mongod = await MongoMemoryServer.create({
    instance: {
      port: 27017,
      dbName: 'garka',
      storageEngine: 'wiredTiger',
    },
  });

  const uri = mongod.getUri();
  console.log(`MongoDB Memory Server started at: ${uri}`);
  
  // Keep the process alive
  process.on('SIGINT', async () => {
    await mongod.stop();
    process.exit(0);
  });
}

start().catch(err => {
  console.error('Failed to start MongoDB Memory Server:', err);
  process.exit(1);
});
