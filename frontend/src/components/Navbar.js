import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'
// import { useState } from 'react'

const Navbar = () => {

  // const [showEmail, setShowEmail] = useState(null)
  const { logout } = useLogout()
  const { user } = useAuthContext() 

  const handleClick = () => {
    logout()
  }


  return (
    <header>
      <div className="container"  style={{ overFlow: 'hidden' }}>
        {!user && (
          <div>
            <Link to="/">
              <h1>Workout Buddy</h1>
            </Link>
          </div>
        )}
        
        {user && (
          <div>
            <Link to="/">
              <h1 className='username'>{user.email.split('@')[0]}</h1>
              <h2 className='username'>{ `your Health Stats`}</h2>
            </Link>
          </div>
        )}

  
        <nav>
          {/* user is login */}
          {user && (
          <div>
            <span>{ user.email}</span>
            <button onClick={ handleClick }>Logout</button>
          </div>
          )}

          {/* user is logout */}
          {!user && (
          <div>
            <Link to="/login">Login</Link>
            <Link to='/signup'>Signup</Link>
          </div>
          )}
        </nav>
      </div>
    </header>
  )
}

export default Navbar