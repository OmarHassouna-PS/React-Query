import { useInfiniteQuery } from 'react-query';

const fetchUsers = async ({ pageParam = 1 }) => {
  const response = await fetch(`https://api.example.com/users?page=${pageParam}`);
  return response.json();
};

const UserList = () => {
  const { data, fetchNextPage, hasNextPage, isLoading, isError } = useInfiniteQuery(
    'users',
    fetchUsers,
    {
      getNextPageParam: (lastPage) => lastPage.nextPage,
    }
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching data</div>;
  }

  return (
    <div>
      {data.pages.map((page) => (
        <ul key={page.page}>
          {page.users.map((user) => (
            <li key={user.id}>{user.name}</li>
          ))}
        </ul>
      ))}
      {hasNextPage && (
        <button onClick={() => fetchNextPage()}>Load More</button>
      )}
    </div>
  );
};

export default UserList;
