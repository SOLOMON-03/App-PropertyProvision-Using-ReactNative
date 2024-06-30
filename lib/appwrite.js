import {
    Account,
    Avatars,
    Client,
    Databases,
    ID,
    Query,
    Storage,
} from "react-native-appwrite";
import validator from 'validator';
export const appwriteConfig = {
    endpoint: "https://cloud.appwrite.io/v1",
    Platform: "com.solomon.HomeFinder",
    projectId: "6665b6d000002802ea62",
    databaseId: "6665b8e6001077d4c542",
    usersCollectionId: "6665b9080015ee6b4b69",
    productsCollectionId: "6665b91e00090d8e6c24",
    bookmarksCollectionId: "667ab55200156513b7de",
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
const storage = new Storage(client);

export const createUser = async (email, password, username) => {
    try {
        const newAccount = await account.create(
            ID.unique(),
            email,
            password,
            username
        );
        if (!newAccount) throw Error;

        const avatarUrl = avatars.getInitials(username);

        await signIn(email, password);

        const newUser = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.usersCollectionId,
            ID.unique(),
            {
                accountId: newAccount.$id,
                email,
                username,
                avatar: avatarUrl,
            }
        );
        return newUser;
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
};

export const signIn = async (email, password) => {
    try {
        const session = await account.createEmailPasswordSession(email, password);
        return session;
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
};

export const getCurrentUser = async () => {
    try {
        const currentAccount = await account.get();

        if (!currentAccount) throw Error;

        const currentUser = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.usersCollectionId,
            [Query.equal("accountId", currentAccount.$id)]
        );
        if (!currentUser) throw Error;
        return currentUser.documents[0];
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
};
export const getAllposts = async () => {
    try {
        const posts = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.productsCollectionId
        );
        return posts.documents;
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
};
export const latestPosts = async () => {
    try {
        const posts = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.productsCollectionId,
            [Query.orderDesc("$createdAt"), Query.limit(6)]
        );
        return posts.documents;
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
};
export const searchPosts = async (query) => {
    try {
        const posts = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.productsCollectionId,
            [Query.search("title", query)]
        );
        return posts.documents;
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
};
export const getUserPosts = async (userId) => {
    try {
        const posts = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.productsCollectionId,
            [Query.equal("creator", userId)]
        );
        return posts.documents;
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
};
export const signOut = async () => {
    try {
        const session = await account.deleteSession("current");
        return session;
    } catch (error) {
        throw new Error(error);
    }
};

export const getFilePreview = async (fileId, type) => {
    let fileUrl;
    try {
        if (type === "image") {
            fileUrl = storage.getFilePreview(
                appwriteConfig.storageId,
                fileId,
                2000,
                2000,
                "top",
                100
            );
        } else {
            throw new Error("Invalid type error!");
        }
        if (!fileUrl) throw Error;

        return fileUrl;
    } catch (error) {
        throw new Error(error);
    }
};

export const uploadFile = async (file, type) => {
    if (!file) return;

    const asset = {
        name: file.fileName,
        type: file.mimeType,
        size: file.fileSize,
        uri: file.uri,
    };
    try {
        const uploadedFile = await storage.createFile(
            appwriteConfig.storageId,
            ID.unique(),
            asset
        );
        const fileUrl = await getFilePreview(uploadedFile.$id, type);
        return fileUrl;
    } catch (error) {
        throw new Error(error);
    }
};

export const createProduct = async (form) => {
    try {
        const [thumnailUrl] = await Promise.all([
            uploadFile(form.thumnail, "image"),
        ]);

        const newPost = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.productsCollectionId,
            ID.unique(),
            {
                title: form.title,
                thumnail: thumnailUrl,
                description: form.description,
                creator: form.userId,
                price: form.price,
                discount: form.discount,
                bedroom: form.bedroom,
                bathroom: form.bathroom,
                location: form.location,
                furnished: form.furnished,
                parking: form.parking,
                rent: form.rent,
                land: form.land,
            }
        );

        return newPost;
    } catch (error) {
        throw new Error(error);
    }
};

export const getPost = async (documentId) => {
    try {
        const post = await databases.getDocument(
            appwriteConfig.databaseId,
            appwriteConfig.productsCollectionId,
            documentId
        );
        return post;
    } catch (error) {
        console.log(error);
        throw new Error(error.message);
    }
};
const isValidUrl = (url) => {
    return validator.isURL(url);
};
export const updateProduct = async (documentId, form) => {
    try {
        const [thumnailUrl] = await Promise.all([
        !isValidUrl(form.thumnail.uri) ? uploadFile(form.thumnail, "image") : form.thumnail.uri
    ]);
        const updatedPost = await databases.updateDocument(
            appwriteConfig.databaseId,
            appwriteConfig.productsCollectionId,
            documentId,
            {
                title: form.title,
                thumnail: thumnailUrl,
                description: form.description,
                creator: form.userId,
                price: Number(form.price),
                discount: Number(form.discount),
                bedroom: Number(form.bedroom),
                bathroom: Number(form.bathroom),
                location: form.location,
                furnished: form.furnished,
                parking: form.parking,
                rent: form.rent,
                land: form.land,
            },
        );
        return updatedPost;
    } catch (error) {
        console.error("Update Product Error:", error); // Added logging
        throw new Error(error);
    }
};

export const deletePost = async (documentId) => {
    try {
        if (!documentId) {
            throw new Error("Document ID is undefined or null.");
        }
        await databases.deleteDocument(
            appwriteConfig.databaseId,
            appwriteConfig.productsCollectionId,
            documentId
        );
    } catch (error) {
        console.error("Delete Post Error:", error);
        throw new Error(`Failed to delete document with ID ${documentId}: ${error.message}`);
    }
};

export const getBookmarkPosts = async (userId) => {
    try {
        const bookmarks = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.bookmarksCollectionId,
            [Query.equal("users", userId)]
        );

        const postId = bookmarks.documents.map((e)=>e.postId);

        if (postId.length === 0) {
            return [];
        }

        const posts = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.productsCollectionId,
            [Query.equal("$id", postId)]
        )
        return posts.documents;
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
};

export const getBookmarkPost = async (documentId) => {
    try {
        const post = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.bookmarksCollectionId,
            [Query.equal('postId', documentId)]
        );
        const postId = post.documents.map((e)=>e.postId);

        if (postId.length === 0) {
            return [];
        }
        return post.documents[0];
    } catch (error) {
        console.log(error);
        throw new Error(error.message);
    }
};

export const updateBookmarkPosts = async (documentId, userId) => {
    try {
        const existingBookmarks = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.bookmarksCollectionId,
            [
                Query.equal('postId', documentId),
                Query.equal('users', userId)
            ]
        );

        if (existingBookmarks.total > 0) {
            const bookmarkId = existingBookmarks.documents[0].$id;
            const updatedBookmark = await databases.updateDocument(
                appwriteConfig.databaseId,
                appwriteConfig.bookmarksCollectionId,
                bookmarkId,
                {
                    postId: documentId,
                    users: userId
                }
            );
            return updatedBookmark;
        } else {
            const newBookmark = await databases.createDocument(
                appwriteConfig.databaseId,
                appwriteConfig.bookmarksCollectionId,
                ID.unique(),
                {
                    postId: documentId,
                    users: userId
                }
            );
            return newBookmark;
        }
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
};

export const deleteBookmarkPosts = async (documentId, userId) => {
    try {
        if (!documentId) {
            throw new Error("Document ID is undefined or null.");
        }
        const existingBookmarks = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.bookmarksCollectionId,
            [
                Query.equal('postId', documentId),
                Query.equal('users', userId)
            ]
        );

        if (existingBookmarks.total === 0) {
            throw new Error(`No bookmark found for documentId ${documentId} and userId ${userId}`);
        }

        const bookmarkId = existingBookmarks.documents[0].$id;
        await databases.deleteDocument(
            appwriteConfig.databaseId,
            appwriteConfig.bookmarksCollectionId,
            bookmarkId
        );
    } catch (error) {
        console.error("Delete bookmark Error:", error);
        throw new Error(`Failed to delete document with ID ${documentId}: ${error.message}`);
    }
};

export const getRentPosts = async () => {
    try {
        const posts = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.productsCollectionId,
            [Query.equal("rent", true)]
        );
        return posts.documents;
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
};

export const getSalePosts = async () => {
    try {
        const posts = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.productsCollectionId,
            [Query.equal("rent", false)]
        );
        return posts.documents;
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
};

export const getHomePosts = async () => {
    try {
        const posts = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.productsCollectionId,
            [Query.equal("land", false)]
        );
        return posts.documents;
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
};

export const getLandPosts = async () => {
    try {
        const posts = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.productsCollectionId,
            [Query.equal("land", true)]
        );
        return posts.documents;
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
};

export const getFurnishedPosts = async () => {
    try {
        const posts = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.productsCollectionId,
            [Query.equal("furnished", true)]
        );
        return posts.documents;
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
};

export const getParkingPosts = async () => {
    try {
        const posts = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.productsCollectionId,
            [Query.equal("parking", true)]
        );
        return posts.documents;
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
};