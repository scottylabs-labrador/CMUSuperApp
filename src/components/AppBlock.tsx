"use client";

import { redirect, useRouter } from 'next/navigation'
import React from 'react'
import { AppInfo } from '~/types'


export function AppBlock({ appInfo }: { appInfo: AppInfo }) {
    const router = useRouter()

    return(
        <div className="flex flex-col items-center gap-4" onClick={() => router.push(appInfo.url)}>
            <div> {appInfo.name} </div>
            <img src={appInfo.icon} alt={appInfo.name} className="w-60 h-40" />
        </div>
    )
}