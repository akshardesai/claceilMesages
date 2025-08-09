// src/appwriteClient.js
import { Client, Databases,Query,ID } from 'appwrite';

// Create the Appwrite client
const client = new Client();

// Replace with your actual endpoint and project ID
client
  .setEndpoint('https://fra.cloud.appwrite.io/v1') // or your self-hosted Appwrite URL
  .setProject(import.meta.env.PUBLIC_APPWRITE_PROJECT_ID);

// Export the services you need
const db = new Databases(client);
const DATABASE_ID = import.meta.env.PUBLIC_APPWRITE_DATABASE_ID;
const CONTACT_COLLECTION_ID= import.meta.env.PUBLIC_APPWRITE_COLLECTION_ID;




export async function listMessages(){


    try {
            const response = await db.listDocuments(DATABASE_ID,CONTACT_COLLECTION_ID,[Query.orderDesc()])

            if (!response) {
                return {success:false,error:'Failed To Fetch Messages'}
            }

          
            
            return {success:true,data:response.documents}
    } catch (error) {
            return {success:false,error:`Catched Error ${error}`}
    }
}