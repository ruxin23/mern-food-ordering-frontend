import { useGetMyUser, useUpdateMyUser } from "@/api/MyUserApi";
import UserProfileForm from "@/forms/user-profile-form/UserProfileForm";
const UserProfilePage = () => {
    const { updateUser, isLoading: isUpdateLoading } = useUpdateMyUser();
    const { currentUser, isLoading: isGetLoading } = useGetMyUser();
    if (isGetLoading) {
        return <p>Loading...</p>;
    }

    if (!currentUser) {
        return <span>Unable to load user profile</span>;
    }
    return (
        <UserProfileForm onSave={updateUser} isLoading={isUpdateLoading} currentUser={currentUser} />
    );
}

export default UserProfilePage;