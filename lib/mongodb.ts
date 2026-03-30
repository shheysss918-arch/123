import { MongoClient, Db } from 'mongodb';

const uri = process.env.MONGODB_URI || 'mongodb://imkindabad121:wBdq58uzLJZRZ3eK@ac-brvf7pj-shard-00-00.qmsyjr5.mongodb.net:27017,ac-brvf7pj-shard-00-01.qmsyjr5.mongodb.net:27017,ac-brvf7pj-shard-00-02.qmsyjr5.mongodb.net:27017/auth?replicaSet=atlas-xnvagr-shard-0&ssl=true&authSource=admin';

let client: MongoClient;
let db: Db;

export async function connect_to_db(): Promise<Db> {
  if (db) return db;

  if (!client) {
    client = new MongoClient(uri);
    await client.connect();
  }

  db = client.db('auth');
  console.log('mongodb'.padEnd(16) + ' [ RELAY_ESTABLISHED ] | [+]');
  return db;
}
