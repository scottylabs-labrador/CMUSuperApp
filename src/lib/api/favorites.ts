"use server";
/**
 * This is a server-side function.  It will not be included in the client bundle which is good because of the Firebase SDK.
 */

export async function getFavorites(clerkId: string): Promise<string[]>{
    return [];   
}

export async function addFavorite(appName: string, clerkId: string): {
    
}