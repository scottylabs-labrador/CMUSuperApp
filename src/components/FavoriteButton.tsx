import { useUser } from "@clerk/nextjs";
import { useMutation, useQuery } from "@tanstack/react-query";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { addFavorite, getFavorites, removeFavorite } from "~/lib/api/favorites";
import { type AppInfo } from "~/types";

interface FavoriteButtonProps {
    app: AppInfo;
}

function FavoriteButton({ app }: FavoriteButtonProps) {
    const { isSignedIn, user } = useUser();

    const {
        status,
        data: favorites = [],
        refetch,
    } = useQuery({
        queryKey: ['favorites', user?.id],
        queryFn: async () => await getFavorites(user?.id),
        enabled: !!user?.id,
    });

    const isFavorite = favorites.includes(app.name);

    const mutFavorite = useMutation({
        mutationFn: () => addFavorite(app.name, user?.id),
        onSuccess: () => {
            refetch().catch((err) => {
                console.error("Error refetching favorites:", err);
            });
        },
    });

    const mutUnfavorite = useMutation({
        mutationFn: () => removeFavorite(app.name, user?.id),
        onSuccess: () => {
            refetch().catch((err) => {
                console.error("Error refetching favorites:", err);
            });
        },
    });

    if (!isSignedIn || status !== "success") return null;

    return isFavorite ? (
        <FaHeart
            className="text-[#FF1111] text-3xl absolute right-4 top-4 cursor-pointer"
            onClick={(e) => {
                e.preventDefault();
                mutUnfavorite.mutate();
            }}
        />
    ) : (
        <FaRegHeart
            className="text-[#FFFFFF] text-3xl absolute right-4 top-4 cursor-pointer"
            onClick={(e) => {
                e.preventDefault();
                mutFavorite.mutate();
            }}
        />
    );
}

export default FavoriteButton;