export default function Navbar() {
  return (
    <div className='navbar bg-base-100'>
      <div className='flex-1'>
        <a className='btn btn-ghost text-xl'>SubMate</a>
      </div>
      <div className='flex-none'>
        <button className='btn btn-square btn-ghost'>Login</button>
      </div>
    </div>
  )
}
