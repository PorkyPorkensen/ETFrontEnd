export default function LoginModal({state, setState}) {

    return (
        <div className='modal-overlay' style={{ display: state ? 'block' : 'none' }}>
        <div className='modalDiv'>
          <h2>Session has Expired!</h2>
          <p>Go to the <a href='/userinfo' onClick={() => {
            localStorage.removeItem('userName')
            localStorage.removeItem('userID')
        }}
            >User Info</a> page to log back in.</p>
        </div>
    
        </div>
      )
}