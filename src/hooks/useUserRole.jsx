import { useQuery } from '@tanstack/react-query';
import useAuth from './UseAuth';
import UseAxios from './UseAxios';

const useUserRole = () => {
    const { user, loading: authLoading } = useAuth();
    const axiosInstance = UseAxios();

    const { data: role = 'member', isLoading: roleLoading, refetch } = useQuery({
        queryKey: ['userRole', user?.email],
        enabled: !authLoading && !!user?.email, 
        queryFn: async () => {
            const res = await axiosInstance.get(`/users/role/${user.email}`);
            return res.data.role;
        },
    });

    return {
        role,
        roleLoading: authLoading || roleLoading,
        refetch
    };
};

export default useUserRole;
