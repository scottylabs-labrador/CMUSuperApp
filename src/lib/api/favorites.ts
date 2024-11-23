"use server";

import prisma from "../prisma";

/**
 * This is a server-side function.  It will not be included in the client bundle which is good because of the Firebase SDK.
 */

export async function getFavorites(clerkId: string): Promise<string[]>{
    const User = await prisma.user.findUnique({
        where: {
          clerkId: clerkId,
        },
      })
    return User.favorites;   
}

export async function addFavorite(appName: string, clerkId: string){
    const favorites = getFavorites(clerkId)
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
}

export async function removeFavorite(appName: string, clerkId: string){
    const favorites = getFavorites(clerkId)
    const addUser = await prisma.user.update({
        where: {
          id: clerkId,
        },
        data: {
          favorites : {
            push: appName
          },
        },
      })
}