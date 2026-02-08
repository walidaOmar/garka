const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');

let mongod;

beforeAll(async () => {
  try {
    mongod = await MongoMemoryServer.create();
    process.env.MONGODB_URI_TEST = mongod.getUri();
    await mongoose.connect(process.env.MONGODB_URI_TEST);
    global.__MONGODB_AVAILABLE__ = true;
  } catch (err) {
    // Fallback to local MongoDB if in-memory instance cannot start (e.g., CI/container environments)
    console.warn('MongoMemoryServer failed to start, falling back to local MongoDB:', err.message);

    const fallbackUri = process.env.MONGODB_URI_TEST || 'mongodb://127.0.0.1:27017/land-marketplace-test';

    try {
      await mongoose.connect(fallbackUri, { serverSelectionTimeoutMS: 5000, family: 4 });
      process.env.MONGODB_URI_TEST = fallbackUri;
      global.__MONGODB_AVAILABLE__ = true;
    } catch (connectErr) {
      console.warn('Local MongoDB not available:', connectErr.message);
      global.__MONGODB_AVAILABLE__ = false;
      delete process.env.MONGODB_URI_TEST;
    }
  }
}, 30000);

afterAll(async () => {
  await mongoose.disconnect();
  if (mongod) await mongod.stop();
}, 30000);

// Test setup for Jest
jest.setTimeout(30000);
