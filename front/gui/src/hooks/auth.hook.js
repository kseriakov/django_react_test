import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const useAuth = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const isLoading = useSelector(({ loading }) => loading);
    const errorMessage = useSelector(({ error }) => error) ?? null;
    const tokenAuth = useSelector(({ token }) => token);

    return {
        dispatch,
        navigate,
        isLoading,
        errorMessage,
        tokenAuth,
    };
};

export default useAuth;
