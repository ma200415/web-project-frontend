import { useContext } from 'react';
import { AuthContext } from "../contexts"

export default function Home() {
  const { user } = useContext(AuthContext);

  return (
    <div>
      {"Hi " + (user && user.email)}
    </div>
  )
}