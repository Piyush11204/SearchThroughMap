import React from 'react'
import HomePage from './Pages/HomePage.tsx'
import Navbar from './components/Navbar.tsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AdminDashboard from './Pages/AdminDashboard.tsx'
import PageNotFound from './Pages/PageNotFound.tsx'
import ProfilesList from './components/ProfilesList.tsx'
const App = () => {



  return (
    <div>
      <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin" element={<AdminDashboard profiles={[]} onSaveProfile={() => {}} onDeleteProfile={() => {}} />} />
        <Route path="/admin/:profileId" element={<AdminDashboard profiles={[]} onSaveProfile={() => {}} onDeleteProfile={() => {}} />} />
        <Route path="/Profiles" element={<ProfilesList profiles={[]} onProfileSelect={() => {}} />} />
        <Route path="*" element={<PageNotFound/>} />

        
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App