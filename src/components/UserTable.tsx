import { useQuery } from "@tanstack/react-query";

import { getUsers } from "../services/user";
import "./UserTable.css";
import { Link } from "@tanstack/react-router";

// Define the User interface according to the data structure
interface GeoLocation {
  lat: string;
  lng: string;
}

interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: GeoLocation;
}

interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
}

function UserTable() {

  const {
    data: users,
    isLoading,
    error,
  } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: getUsers,
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>There is an error loading user data</div>;
  }

  return (
    <div className="user-table-container">
      <div className="title-container">
        <h2>User Details</h2>

        <Link to="/table/create">Create User</Link>
      </div>
      <table className="user-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Username</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Website</th>
            <th>City</th>
            <th>Company</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users &&
            users.map((user: User) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>{user.website}</td>
                <td>{user.address.city}</td>
                <td>{user.company.name}</td>
                <td>
                  <Link 
                    to="/table/$id/edit" 
                    params={{ id: user.id.toString() }}
                    className="edit-button"
                  >
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserTable;
