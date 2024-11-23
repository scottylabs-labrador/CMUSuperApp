"use server";

import prisma from "../prisma";

/**
 * This is a server-side function.  It will not be included in the client bundle which is good because of the Firebase SDK.
 */

export async function getFavorites(clerkId: string): Promise<string[]>{
    const User = await prisma.user.findUnique({
        where: {
          id: clerkId,
        },
      })
    return [];   
}

export async function addFavorite(appName: string, clerkId: string): {
    return;
}