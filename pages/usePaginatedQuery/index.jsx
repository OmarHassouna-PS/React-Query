import { usePaginatedQuery } from 'react-query';

const fetchUsers = async (page = 1) => {
  const response = await fetch(`https://dummyjson.com/users?page=${page}`);
  return response.json();
};

const UserList = () => {
  const { resolvedData, latestData, status, fetchNextPage, isFetchingNextPage } = usePaginatedQuery('users', fetchUsers);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'error') {
    return <div>Error fetching data</div>;
  }

  return (
    <div>
      {resolvedData.pages.map((page) => (
        <ul key={page.page}>
          {page.users.map((user) => (
            <li key={user.id}>{user.name}</li>
          ))}
        </ul>
      ))}
      {resolvedData.hasNextPage && (
        <button onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
          {isFetchingNextPage ? 'Loading...' : 'Load More'}
        </button>
      )}
    </div>
  );
};

export default UserList;