


export default function Modal({state, setState}) {

    return (
        <div className='modal-overlay' style={{ display: state ? 'block' : 'none' }}>
        <div className='modalDiv'>
          <h2>Must have an account to view Tasks</h2>
          <p>Go to the <a href='/userinfo'>User Info</a> page to create an account or log in.</p>
          <p>Enjoy 0 Strings Attatched Signup!</p>
          <button className='userButton' onClick={() => setState(false)}>Close</button>
        </div>
    
        </div>
      )
}