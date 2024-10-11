import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";
import { useAuth0 } from "@auth0/auth0-react";
import { Restaurant } from "@/types";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useGetMyRestaurant = () => {
    const { getAccessTokenSilently } = useAuth0();

    const getMyRestaurantRequest = async (): Promise<Restaurant> => {
        const accessToken = await getAccessTokenSilently();
        const response = await fetch(`${API_BASE_URL}/api/my/restaurant`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        if (!response.ok) {
            throw new Error("Failed to fetch my restaurant");
        }
        return response.json();
    }
    const { data: restaurant, isLoading } = useQuery("fetchMyRestaurant", getMyRestaurantRequest)

    return { restaurant, isLoading };
}