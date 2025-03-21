import { useUser } from "@clerk/nextjs";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { addFavorite, getFavorites, removeFavorite } from "~/lib/api/favorites";
import { AppInfo } from "~/types";

interface FavoriteButtonProps {
    app: AppInfo;
}

function FavoriteButton({app}: FavoriteButtonProps) {
    const {isSignedIn, user} = useUser();
    const queryClient = useQueryClient();
    const {status, data} = useQuery({ queryKey: ['favorites', user?.id], queryFn: async () => {
        const favorites = await getFavorites(user?.id); 
        return favorites;
    }});
    const isFavorite = data?.includes(app.name)
    const mutFavorite = useMutation({
        mutationFn: () => addFavorite(app.name, user?.id),
        onSuccess: (data) => {
            console.log("favoriting", data);
            queryClient.setQueryData(['favorites', user?.id], data);
        }
    });
    const mutUnfavorite = useMutation({
        mutationFn: () => removeFavorite(app.name, user?.id),
        onSuccess: (data) => {
            queryClient.setQueryData(['favorites', user?.id], data?.filter((favorite: string) => favorite !== app.name));
        }
    });
    return (
        (isSignedIn && status == "success") && 
        isFavorite ? <FaHeart className="text-[#FF1111] text-3xl absolute right-4 top-4" onClick={(e) => {
            console.log("unfavoriting", isFavorite);
            mutUnfavorite.mutate();
            e.preventDefault();
        }} />
        : <FaRegHeart className="text-[#FFFFFF] text-3xl absolute right-4 top-4" onClick={(e) => {
            console.log("favoriting", isFavorite);
            mutFavorite.mutate();
            e.preventDefault();
        }} />
    )
}

export default FavoriteButton;