import { useMutation } from 'react-query';

const createUser = async (userData) => {
  const response = await fetch('https://dummyjson.com/users/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });

  return response.json();
};


const AddUserForm = () => {
  const mutation = useMutation(createUser);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const userData = Object.fromEntries(formData);

    mutation.mutate(userData);
  };

  if (mutation.isLoading) {
    return <div>Creating user...</div>;
  }

  if (mutation.isError) {
    return <div>Error creating user</div>;
  }

  if (mutation.isSuccess) {
    return <div>User created successfully</div>;
  }

  return (

    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24`}
    >
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" />
        <input type="email" name="email" placeholder="Email" />
        <button type="submit">Add User</button>
      </form>

    </main>
  );
};

export default AddUserForm;
