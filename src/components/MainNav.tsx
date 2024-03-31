import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "./ui/button";
import UsernameMenu from "./UsernameMenu";

const MainNav = () => {
    const { loginWithRedirect, isAuthenticated } = useAuth0();
    return (
        <span className="flex items-center space-x-2">
            {isAuthenticated ? (
                <UsernameMenu />
            ) : (
                <Button
                    onClick={() => loginWithRedirect()}
                    variant="ghost"
                    className="font-bold hover:text-orange-500 hover:bg-white">
                    Login
                </Button>
            )}
        </span>
    );
}

export default MainNav;