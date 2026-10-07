import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Navbar from './Navbar'

function Layout() {
  const [open, setOpen] = useState(false)

  return (
    <div className="min-h-screen bg-app bg-mesh text-white">
      <Sidebar open={open} onClose={() => setOpen(false)} />
      <div className="lg:pl-[260px]">
        <Navbar onMenu={() => setOpen(true)} />
        <main className="px-4 py-6 sm:px-6 lg:px-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default Layout
