"use client";

import React from 'react'
import { type AppInfo } from '~/types'
import FavoriteButton from './FavoriteButton';


export function AppBlock({app}: {app: AppInfo}) {
    return(
        <a href={app.url} key={app.name} className="flex flex-col items-center w-full cursor-pointer transition-transform transform hover:scale-105 border-2 border-black p-4 rounded-lg bg-transparent">
            <FavoriteButton app={app} />
            <img src={app.icon} alt={app.name} className="w-32 h-32 mb-2 object-contain" />
            <p className="font-medium text-white text-lg">{app.name}</p>
            <p className="text-sm text-white">{app.description}</p>
        </a>
    )
}