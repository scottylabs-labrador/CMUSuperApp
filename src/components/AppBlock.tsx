"use client";

import React from 'react'
import { AppInfo } from '~/types'
import { FaHeart, FaRegHeart } from "react-icons/fa6";
import { addFavorite, getFavorites, removeFavorite } from '~/lib/api/favorites';
import { useUser } from '@clerk/nextjs';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';


export function AppBlock({app}: {app: AppInfo}) {
    const {isSignedIn, user} = useUser();
    const queryClient = useQueryClient();
    const {status, data} = useQuery({ queryKey: ['favorites', app.name, user?.id], queryFn: () => getFavorites(user?.id) });
    const isFavorite = data?.includes(app.name);
    const mutFavorite = useMutation({
        mutationFn: () => addFavorite(app.name, user?.id),
        onSuccess: (data) => {
            queryClient.setQueryData(['favorites', app.name, user?.id], [...(data || []), app.name]);
        }
    });
    const mutUnfavorite = useMutation({
        mutationFn: () => removeFavorite(app.name, user?.id),
        onSuccess: (data) => {
            queryClient.setQueryData(['favorites', app.name, user?.id], data?.filter((favorite: string) => favorite !== app.name));
        }
    });

    return(
        <a href={app.url} key={app.name} className="flex flex-col items-center w-full cursor-pointer transition-transform transform hover:scale-105 border-2 border-black p-4 rounded-lg bg-transparent">
            {(isSignedIn && status == "success") && 
            isFavorite ? <FaHeart className="text-[#FF1111] text-3xl absolute right-4 top-4" onClick={(e) => {
                e.preventDefault();
                mutUnfavorite.mutate();
            }} />
            : <FaRegHeart className="text-[#FFFFFF] text-3xl absolute right-4 top-4" onClick={(e) => {
                e.preventDefault();
                mutFavorite.mutate();
            }} />
        }
            <img src={app.icon} alt={app.name} className="w-32 h-32 mb-2 object-contain" />
            <p className="font-medium text-white text-lg">{app.name}</p>
            <p className="text-sm text-white">{app.description}</p>
        </a>
    )
}