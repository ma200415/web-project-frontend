import { useContext } from 'react';
import { AuthContext } from "../authContext"

export default function Home() {
  const { user } = useContext(AuthContext);

  const AdminMsg = () => {
    if (user != null) {
      if (user.admin) {
        return " You are admin"
      }
    }
  }

  return (
    <div>
      <h2>
        {(user && "Welcome " + user.email + "!")}
        {AdminMsg()}
      </h2>
    </div>
  )
}