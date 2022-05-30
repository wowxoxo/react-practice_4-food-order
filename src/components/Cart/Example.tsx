import React, { useState } from "react";

interface ExampleProps {
  title: string;
}

interface IUser {
  name: string;
  age: number;
}

const Example: React.FC<ExampleProps> = ({ title }) => {
  // const [user, setUser] = useState<IUser | null>(null);
  const [user, setUser] = useState<IUser>({} as IUser);
  const handler = () => {
    setUser({ name: "as", age: 6 });
  };

  // Vue
  // data() {
  //   return {
  //     name: undefined,
  //   }
  // }

  return (
    <div>
      <h1>Hello</h1>
      <button onClick={handler}>Bump</button>
      {user && <div>{user.name}</div>}
      {!user && <div>User not found</div>}
    </div>
  );
};

export default Example;
