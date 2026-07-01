import { Client, Account, Databases, Storage, TablesDB } from "appwrite";

const client = new Client()
    .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
    .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);

const DATABASE_ID = import.meta.env.VITE_DATABASE_ID
const TABLE_ID = import.meta.env.VITE_TABLE_ID
const POST_TABLE_ID = import.meta.env.POST_TABLE_ID

const account = new Account(client);
const databases = new Databases(client);
const storage = new Storage(client);
const db = new TablesDB(client);

export { client, account, databases , db , DATABASE_ID , TABLE_ID , POST_TABLE_ID };
