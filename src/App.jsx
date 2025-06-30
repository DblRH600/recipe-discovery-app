import './App.css'
import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import NavBar from './components/NavBar'
import HomePage from './pages/HomePage'
import FavoritesPage from './pages/FavoritesPage'
import CategoryPage from './pages/CategoryPage'
import NotFoundPage from './pages/NotFoundPage'
import SearchResultPage from './pages/SearchResultPage'
import RecipeDetailPage from './pages/RecipeDetailPage'
import FavoritesProvider from './context/FavoritesContext'

function App() {
  

  return (
    <FavoritesProvider>
    <NavBar />

      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/favorites' element={<FavoritesPage />} />
        <Route path='/search' element={<SearchResultPage />} />
        <Route path='/category/:categoryName' element={<CategoryPage />} />
        <Route path='/recipe/:recipeId' element={<RecipeDetailPage />} />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </FavoritesProvider>
  )
}

export default App
