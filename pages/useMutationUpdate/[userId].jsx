import { useRouter } from 'next/router';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const updateUser = async (userId, userData) => {
    throw new Error('Error updateUser');
    const response = await fetch(`https://dummyjson.com/users/${userId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    });

    return response.json();
};
const fetchUser = async (userId) => {

    const response = await fetch(`https://dummyjson.com/users/${userId}`);
    return response.json();
};


function notify(toastMessage, toastType) {
    toast(toastMessage, {
        type: toastType
    })
};

const UserEditForm = () => {

    const router = useRouter();

    const { data, isLoading, isError } = useQuery(['user', router.query.userId], () => fetchUser(router.query.userId));

    const queryClient = useQueryClient();
    const mutation = useMutation((userData) => updateUser(data.id, userData), {
        onMutate: (variables) => {
            // Snapshot the previous value
            const previousUser = queryClient.getQueryData(['user', data.id]);
            console.log("🚀 ~ file: [userId].jsx:42 ~ mutation ~ previousUser:", previousUser)

            // Optimistically update the UI
            queryClient.setQueryData(['user', data.id], (oldData) => ({
                ...oldData,
                ...variables,
            }));

            // Return a function to rollback to the previous value if the mutation fails
            return () => queryClient.setQueryData(['user', data.id], previousUser);
        },
        onError: (error, variables, rollback) => {
            // Handle error and rollback to the previous value
            notify('Error updated user', 'warning');
            rollback();
        },
        onSuccess: () => {
            // Invalidate the user query to refetch the latest data from the server
            notify('The user has been updated successfully', 'success');
            queryClient.invalidateQueries(['user', data.id]);
        },
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const userData = Object.fromEntries(formData);

        mutation.mutate(userData);
    };

    return (
        <>
            <ToastContainer />

            <form onSubmit={handleSubmit}>
                <input type="text" name="name" defaultValue={data?.firstName} />
                <input type="email" name="email" defaultValue={data?.email} />
                <button type="submit">Save Changes</button>
            </form>
        </>
    );
};

export default UserEditForm;