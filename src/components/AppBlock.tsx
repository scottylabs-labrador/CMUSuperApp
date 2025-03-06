"use client";

import { redirect, useRouter } from 'next/navigation'
import React from 'react'
import { AppInfo } from '~/types'
import { FaCirclePlus } from "react-icons/fa6";
import { addFavorite } from '~/lib/api/favorites';
import { useUser } from '@clerk/nextjs';


export function AppBlock(cardInfo: { appInfo: AppInfo, cardType: "s" | "m" | "l" }) {
    const router = useRouter()
    const {isLoaded, isSignedIn, user} = useUser();
    const userId = (user?.id as string)
    const appInfo = cardInfo.appInfo 

    const size = cardInfo.cardType === "s" ? "size-64" : cardInfo.cardType === "m" ? "size-96" : "size-128"

    return(
        <div className="shrink-0 w-64 h-64 grid grid-cols-1 place-content-start gap-4" >
            <img src={appInfo.icon} alt={appInfo.name} className="object-cover rounded-3xl h-64 w-64 bg-gray-100" onClick={() => router.push(appInfo.url)} />
            {/* plus button to add favorite */}
            <div className="fixed" onClick={() => addFavorite(appInfo.name, userId)}>
                <FaCirclePlus className="text-3xl text-gray-500 cursor-pointer" />
            </div>

            <div className='object-cover rounded-lg w-64 p-2  bg-gray-100'> 
                <p className='text-lg'>{appInfo.name}</p>
                <p className='text-sm'>{appInfo.description}</p>
             </div>
        </div>
    )
}