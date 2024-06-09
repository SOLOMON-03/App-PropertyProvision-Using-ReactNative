import { Account, Avatars, Client, Databases, ID, Query } from "react-native-appwrite";
export const appwriteConfig = {
    endpoint: "https://cloud.appwrite.io/v1",
    Platform: "com.solomon.HomeFinder",
    projectId: "6665b6d000002802ea62",
    databaseId: "6665b8e6001077d4c542",
    usersCollectionId: "6665b9080015ee6b4b69",
    productsCollectionId: "6665b91e00090d8e6c24",
    storageId: "6665ba1e0021b4496078",
};

const client = new Client();

client
    .setEndpoint(appwriteConfig.endpoint)
    .setProject(appwriteConfig.projectId)
    .setPlatform(appwriteConfig.Platform);

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

export const createUser = async (email, password, username) => {
    try {
        const newAccount = await account.create(
            ID.unique(),
            email,
            password,
            username
        )
        if(!newAccount) throw Error;

        const avatarUrl = avatars.getInitials(username)

        await signIn(email, password)

        const newUser = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.usersCollectionId,
            ID.unique(),
            {
                accountId: newAccount.$id,
                email,
                username,
                avatar: avatarUrl
            }
        )
        return newUser;
    }
    catch (error) {
        console.log(error);
        throw new Error(error);
    }
};

export const signIn = async(email, password) => {
    try {
        const session = await account.createEmailPasswordSession(email, password);
        return session;
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
}

export const getCurrentUser = async() => {
    try {
        const currentAccount = await account.get();

        if(!currentAccount) throw Error;

        const currentUser = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.usersCollectionId,
            [Query.equal('accountId' , currentAccount.$id)] 
        ); 
        if(!currentUser) throw Error;
        return currentUser.documents[0];
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
}
export const getAllposts = async() => {
    try {
        const posts = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.productsCollectionId,
        )
        return posts.documents;
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
}
export const latestPosts = async() => {
    try {
        const posts = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.productsCollectionId,
            [Query.orderDesc('$createdAt', Query.limit(6))]
        )
        return posts.documents;
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
}
export const searchPosts = async(query) => {
    try {
        const posts = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.productsCollectionId,
            [Query.search('title', query)]
        )
        return posts.documents;
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
}
export const getUserPosts = async(userId) => {
    try {
        const posts = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.productsCollectionId,
            [Query.equal('creator', userId)]
        )
        return posts.documents;
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
}
export const signOut = async () => {
    try {
        const session = await account.deleteSession('current');
        return session;
    } catch (error) {
        throw new Error(error);
    }
}