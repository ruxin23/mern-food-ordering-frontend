import ManageRestaurantForm from "@/forms/manage-restaurant-form/ManageRestaurantForm";
import { useGetMyRestaurant } from '../api/MyRestaurantApi';
const ManageRestaurantPage = () => {
    const { restaurant } = useGetMyRestaurant();
    return (
        <ManageRestaurantForm onSave={(data) => console.log(data)} isLoading={false} restaurant={restaurant} />
    );
}

export default ManageRestaurantPage;