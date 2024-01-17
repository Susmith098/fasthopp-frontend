import { GetAccess } from '../store/authSlice';
import { useDispatch, useSelector } from 'react-redux';
const GetAccessToken = () => {
    const dispatch = useDispatch()
    const { access, refresh } = useSelector(state => state.usertoken)
    // if access token, will check expiry time 
    // and if it is less than 5minutes, wil get the new access token using refresh token
    if (access) {
        function getPayload(access) {
            return JSON.parse(atob(access.split(".")[1]));
        }
        const payload = getPayload(access);
        const expiration = new Date(payload.exp * 1000);
        const now = new Date();
        const fiveMinutes = 1000 * 60 * 5;
        if (expiration.getTime() - now.getTime() < fiveMinutes) {

            //    if user logged in, get access for user
            dispatch(GetAccess({ refresh }))
                .then(() => console.log("User token refreshed successfully"))
                .catch(error => console.error("Error refreshing user token:", error));

        }
    }
}

export default GetAccessToken;