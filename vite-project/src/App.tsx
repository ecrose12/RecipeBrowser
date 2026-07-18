import { useState } from 'react'
import './App.css'
import Header from "./components/header.tsx"
import Body from "./components/body.tsx"
import Footer from "./components/footer.tsx"
import { Routes, Route } from 'react-router-dom'
import MealDetail from './components/mealDetail.tsx'

export default function App() {
    const [useUS, setUseUS] = useState<boolean>(() => {
        return localStorage.getItem("useUS") === "true"
    })

    function toggleUS(val: boolean) {
        setUseUS(val)
        localStorage.setItem("useUS", val.toString())
    }

    return (
        <>
            
                <a href="#main-content"
                className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:px-4 focus:py-2 focus:bg-blue-500 focus:text-white focus:rounded-full focus:text-sm focus:font-bold"
            >
                Skip to main content
            </a>
            <Header title="Elizabeth's Meal App" useUS={useUS} setUseUS={toggleUS} />
            <main id="main-content">
                <Routes>
                    <Route path="/" element={<Body useUS={useUS} />} />
                    <Route path="/meal/:id" element={<MealDetail useUS={useUS} />} />
                </Routes>
            </main>
            <Footer />
        </>
    )
}
