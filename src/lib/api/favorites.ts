"use server";

import prisma from "../prisma";

/**
 * This is a server-side function.  It will not be included in the client bundle which is good because of the Firebase SDK.
 */

export async function getFavorites(clerkId: string | undefined): Promise<string[]>{
    if (!clerkId) {
        return [];
    }
    const User = await prisma.user.findUnique({
        where: {
          clerkId: clerkId,
        },
      })
    return User?.favorites ?? [];   
}

export async function addFavorite(appName: string, clerkId: string | undefined){
    if (!clerkId) {
        return;
    }

    const favorites = await getFavorites(clerkId)
    if (favorites.includes(appName)) {
        return favorites;
    }

    const addUser = await prisma.user.upsert({
        where: {
          clerkId: clerkId,
        },
        update: {
          favorites : {
            push: appName
          },
        },
        create: {
                clerkId: clerkId,
                favorites : [appName],
            }
        })
    console.log(addUser)
    return addUser.favorites
}

export async function removeFavorite(appName: string, clerkId: string | undefined){
    if (!clerkId) {
        return;
    }
    const favorites = await getFavorites(clerkId)
    console.log("removeFavorite", favorites)
    const newFavorites = favorites.filter((favorite) => favorite !== appName)
    const addUser = await prisma.user.update({
        where: {
          clerkId: clerkId,
        },
        data: {
          favorites: newFavorites
        },
      })
    return addUser.favorites
}