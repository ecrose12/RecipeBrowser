import { useState, useEffect } from "react"
import { Sun, Moon, Ruler } from "lucide-react"

interface Props {
    title?: string
    color?: string
    size?: string
    useUS: boolean
    setUseUS: (val: boolean) => void
}

export default function Header({ title = "Elizabeth's Meal App", useUS, setUseUS }: Props) {
    const [isDark, setIsDark] = useState<boolean>(() => {
        return localStorage.getItem("theme") === "dark"
    })

    useEffect(() => {
        const html = document.documentElement
        const theme = isDark ? "dark" : "light"
        html.setAttribute("data-theme", theme)
        if (isDark) {
            html.classList.add("dark")
        } else {
            html.classList.remove("dark")
        }
        localStorage.setItem("theme", theme)
    }, [isDark])

    return (
        <div className="flex flex-col items-center justify-center px-6 py-6 border-b border-base-300 bg-base-100 gap-4">
            <h1 className="text-4xl font-extrabold text-base-content tracking-tight text-center">{title}</h1>
            <div className="flex items-center gap-3 flex-wrap justify-center">
                <button
                    onClick={() => setIsDark(!isDark)}
                    className="flex items-center gap-2 px-4 py-2 rounded-full border-2 border-base-300 text-base-content text-xs font-bold uppercase tracking-wide hover:bg-base-200 transition-colors"
                >
                    {isDark ? <Sun size={16} /> : <Moon size={16} />}
                    {isDark ? "Light Mode" : "Dark Mode"}
                </button>
                <label className="flex items-center gap-2 px-4 py-2 rounded-full border-2 text-xs font-bold uppercase tracking-wide transition-colors cursor-pointer"
                    style={{ borderColor: useUS ? "#3b82f6" : undefined, color: useUS ? "#3b82f6" : undefined }}
                >
                    <Ruler size={16} />
                    US Measurements
                    <input
                        type="checkbox"
                        checked={useUS}
                        onChange={(e) => setUseUS(e.target.checked)}
                        className="ml-1 w-4 h-4 accent-blue-500"
                    />
                </label>
            </div>
        </div>
    )
}
