import { useQuery, useQueryClient } from 'react-query';

const fetchUsers = async () => {
  const response = await fetch('https://dummyjson.com/users');
  return response.json();
};

const UserList = () => {
  const queryClient = useQueryClient();

  const handleRefresh = () => {
    queryClient.invalidateQueries('users');
  };

  const { data, isLoading, isError } = useQuery('users', fetchUsers);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching data</div>;
  }

  return (
    <>
      <ul>
        {data.users.map((user) => (
          <li key={user.id}>{user.id} -{user.firstName}</li>
        ))}
      </ul>
      <button onClick={handleRefresh}>Refresh Data</button>
    </>
  );
};

export default UserList;
