import { useState } from "react"
import { Link, useLocation } from "react-router-dom"

const Tray = () => {
    const location = useLocation()
    const [activeScreen, setActiveScreen] = useState(() => {
        // Determine active screen based on current location
        if (location.pathname === "/home" || location.pathname === "/home") return "home"
        if (location.pathname.startsWith("/campaigns")) return "campaigns"
        if (location.pathname.startsWith("/products")) return "products"
        if (location.pathname.startsWith("/profile")) return "profile"
        return "home"
    })

    return (
        <div className="fixed -bottom-1 left-0 right-0 z-50 border-t border-border bg-background/80 backdrop-blur-sm">
            <div className="flex justify-center items-center py-4 px-6">
                <div className="flex justify-center space-x-6 max-w-md w-full">
                    
                    <Link to="/home" className="no-underline">
                        <div 
                            className={`flex flex-col items-center space-y-2 cursor-pointer transition-all duration-200 ${
                                activeScreen === "home" 
                                    ? "opacity-100" 
                                    : "opacity-60 hover:opacity-80"
                            }`}
                            onClick={() => setActiveScreen("home")}
                        >
                            <div className={`rounded-full h-8 w-8 flex items-center justify-center transition-all duration-200 ${
                                activeScreen === "home" 
                                    ? "bg-accent border-2 border-accent-foreground/20" 
                                    : "bg-muted hover:bg-muted/80"
                            }`}>
                                <svg className={`h-4 w-4 transition-colors duration-200 ${
                                    activeScreen === "home" 
                                        ? "text-accent-foreground" 
                                        : "text-muted-foreground"
                                }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                </svg>
                            </div>
                            <p className={`text-xs font-medium text-center transition-colors duration-200 ${
                                activeScreen === "home" 
                                    ? "text-accent-foreground font-semibold" 
                                    : "text-muted-foreground"
                            }`}>Home</p>
                        </div>
                    </Link>

                    <Link to="/campaigns" className="no-underline">
                        <div 
                            className={`flex flex-col items-center space-y-2 cursor-pointer transition-all duration-200 ${
                                activeScreen === "campaigns" 
                                    ? "opacity-100" 
                                    : "opacity-60 hover:opacity-80"
                            }`}
                            onClick={() => setActiveScreen("campaigns")}
                        >
                            <div className={`rounded-full h-8 w-8 flex items-center justify-center transition-all duration-200 ${
                                activeScreen === "campaigns" 
                                    ? "bg-accent border-2 border-accent-foreground/20" 
                                    : "bg-muted hover:bg-muted/80"
                            }`}>
                                <svg className={`h-4 w-4 transition-colors duration-200 ${
                                    activeScreen === "campaigns" 
                                        ? "text-accent-foreground" 
                                        : "text-muted-foreground"
                                }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                </svg>
                            </div>
                            <p className={`text-xs font-medium text-center transition-colors duration-200 ${
                                activeScreen === "campaigns" 
                                    ? "text-accent-foreground font-semibold" 
                                    : "text-muted-foreground"
                            }`}>Campaigns</p>
                        </div>
                    </Link>
                    
                    <Link to="/campaigns/create" className="no-underline">
                        <div className="flex flex-col items-center space-y-2 cursor-pointer hover:scale-110 transition-all duration-200">
                            <div className="rounded-full bg-primary h-10 w-10 flex items-center justify-center shadow-lg hover:shadow-xl">
                                <svg className="h-5 w-5 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                            </div>
                            <p className="text-xs text-primary font-semibold text-center">New Campaign</p>
                        </div>
                    </Link>

                    <Link to="/products" className="no-underline">
                        <div 
                            className={`flex flex-col items-center space-y-2 cursor-pointer transition-all duration-200 ${
                                activeScreen === "products" 
                                    ? "opacity-100" 
                                    : "opacity-60 hover:opacity-80"
                            }`}
                            onClick={() => setActiveScreen("products")}
                        >
                            <div className={`rounded-full h-8 w-8 flex items-center justify-center transition-all duration-200 ${
                                activeScreen === "products" 
                                    ? "bg-accent border-2 border-accent-foreground/20" 
                                    : "bg-muted hover:bg-muted/80"
                            }`}>
                                <svg className={`h-4 w-4 transition-colors duration-200 ${
                                    activeScreen === "products" 
                                        ? "text-accent-foreground" 
                                        : "text-muted-foreground"
                                }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                </svg>
                            </div>
                            <p className={`text-xs font-medium text-center transition-colors duration-200 ${
                                activeScreen === "products" 
                                    ? "text-accent-foreground font-semibold" 
                                    : "text-muted-foreground"
                            }`}>Products</p>
                        </div>
                    </Link>

                    <Link to="/profile" className="no-underline">
                        <div 
                            className={`flex flex-col items-center space-y-2 cursor-pointer transition-all duration-200 ${
                                activeScreen === "profile" 
                                    ? "opacity-100" 
                                    : "opacity-60 hover:opacity-80"
                            }`}
                            onClick={() => setActiveScreen("profile")}
                        >
                            <div className={`rounded-full h-8 w-8 flex items-center justify-center transition-all duration-200 ${
                                activeScreen === "profile" 
                                    ? "bg-accent border-2 border-accent-foreground/20" 
                                    : "bg-muted hover:bg-muted/80"
                            }`}>
                                <svg className={`h-4 w-4 transition-colors duration-200 ${
                                    activeScreen === "profile" 
                                        ? "text-accent-foreground" 
                                        : "text-muted-foreground"
                                }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            </div>
                            <p className={`text-xs font-medium text-center transition-colors duration-200 ${
                                activeScreen === "profile" 
                                    ? "text-accent-foreground font-semibold" 
                                    : "text-muted-foreground"
                            }`}>Profile</p>
                        </div>
                    </Link>

                </div>
            </div>
        </div>
    )
}

export default Tray