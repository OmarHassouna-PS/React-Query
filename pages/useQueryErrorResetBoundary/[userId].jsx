import { useRouter } from 'next/router';
import { useQuery, useQueryErrorResetBoundary } from 'react-query';

const fetchUser = async (userId) => {

  throw new Error('Fetching user');
  const response = await fetch(`https://dummyjson.com/users/${userId}`);
  return response.json();
};

const UserDetails = () => {

  const router = useRouter();

  const { data, isLoading, isError } = useQuery(['user', router.query.userId], () => fetchUser(router.query.userId));
  const errorResetBoundary = useQueryErrorResetBoundary(['user', router.query.userId]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return (
      <div>
        Error fetching user data. <button onClick={() => errorResetBoundary.reset()} >Retry</button>
      </div>
    );
  }

  return (
    <div>
      <h2>{data.name}</h2>
      <p>Email: {data.email}</p>
      <p>Age: {data.age}</p>
      {/* Display other user details */}
    </div>
  );
};

export default UserDetails;
