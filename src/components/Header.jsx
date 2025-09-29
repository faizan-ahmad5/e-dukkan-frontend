import { useState, useEffect } from "react";
import { ShoppingBag, Heart, ShoppingCart, User, Menu, X, Sun, Moon, Search, ChevronDown } from "lucide-react";
import { categoriesAPI } from "../api/index.js";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fake auth state
  const isLoggedIn = false;

  // Dark mode toggle
  useEffect(() => {
    const html = document.documentElement;
    if (darkMode) {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }
  }, [darkMode]);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const response = await categoriesAPI.getMenuCategories();
        setCategories(response.data || []);
      } catch (error) {
        console.error('Failed to fetch categories:', error);
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Shadow on scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-lg border-b border-gray-200/20 dark:border-gray-700/30 transition-all duration-300 ${
        scrolled ? "shadow-xl shadow-black/5" : "shadow-lg shadow-black/5"
      }`}
    >
      {/* Top banner - Optional promotional banner */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-center py-2 text-sm font-medium">
        <p className="flex items-center justify-center gap-2">
          🎉 <span>Free shipping on orders over $50!</span> <span className="underline cursor-pointer hover:no-underline">Shop Now</span>
        </p>
      </div>

      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 lg:px-6 py-4">
        {/* Logo */}
        <a
          href="/"
          className="flex items-center gap-3 group transition-all duration-300 hover:scale-105"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl blur opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative bg-gradient-to-r from-indigo-600 to-purple-600 p-2 rounded-xl shadow-lg">
              <ShoppingBag className="h-6 w-6 text-white" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-2xl bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              E-Dukaan
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400 font-medium tracking-wide">
              Your Shopping Paradise
            </span>
          </div>
        </a>

        {/* Desktop Search */}
        <div className="hidden md:flex flex-1 max-w-2xl mx-8">
          <div className="relative w-full group">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/20 to-purple-600/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative flex items-center">
              <Search className="absolute left-4 h-5 w-5 text-gray-400 dark:text-gray-500 z-10" />
              <input
                type="text"
                placeholder="Search for products, brands, and more..."
                className="w-full pl-12 pr-4 py-3 rounded-2xl border border-gray-200 dark:border-gray-700
                           bg-gray-50/50 dark:bg-gray-800/50 text-gray-800 dark:text-gray-200 backdrop-blur-sm
                           focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50
                           hover:bg-white dark:hover:bg-gray-800 hover:shadow-lg
                           transition-all duration-300 placeholder:text-gray-400 dark:placeholder:text-gray-500"
              />
              <div className="absolute right-2">
                <button className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-2 rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-300">
                  <Search className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 lg:gap-4">
          {/* Categories */}
          <div className="relative hidden lg:block">
            <button
              onClick={() => setCategoriesOpen(!categoriesOpen)}
              className="flex items-center gap-2 px-4 py-2.5 text-gray-700 dark:text-gray-200 
                         hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-gray-50 dark:hover:bg-gray-800
                         rounded-xl font-medium transition-all duration-300 group"
            >
              Categories
              <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${categoriesOpen ? 'rotate-180' : ''}`} />
            </button>
            {categoriesOpen && (
              <div className="absolute top-full mt-2 w-64 bg-white/95 dark:bg-slate-800/95 backdrop-blur-lg shadow-2xl rounded-2xl overflow-hidden border border-gray-200/20 dark:border-gray-700/30 animate-dropdown">
                <div className="p-2 max-h-96 overflow-y-auto">
                  {loading ? (
                    <div className="flex items-center justify-center py-8">
                      <div className="animate-spin h-6 w-6 border-2 border-indigo-600 border-t-transparent rounded-full"></div>
                      <span className="ml-2 text-gray-600 dark:text-gray-400">Loading categories...</span>
                    </div>
                  ) : categories.length > 0 ? (
                    categories.map((category) => (
                      <div key={category._id} className="mb-1">
                        <a
                          href={`/category/${category.slug}`}
                          className="flex items-center gap-3 px-4 py-3 hover:bg-gradient-to-r hover:from-indigo-600 hover:to-purple-600 
                                    hover:text-white transition-all duration-300 rounded-xl group"
                        >
                          {category.icon && <span className="text-lg">{category.icon}</span>}
                          <div className="flex flex-col">
                            <span className="font-medium">{category.name}</span>
                            {category.description && (
                              <span className="text-xs opacity-70 group-hover:opacity-100 transition-opacity">
                                {category.description.length > 30 
                                  ? category.description.substring(0, 30) + '...' 
                                  : category.description}
                              </span>
                            )}
                          </div>
                        </a>
                        {category.subcategories && category.subcategories.length > 0 && (
                          <div className="ml-8 pl-4 border-l border-gray-200 dark:border-gray-700">
                            {category.subcategories.slice(0, 3).map((subcat) => (
                              <a
                                key={subcat._id}
                                href={`/category/${subcat.slug}`}
                                className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 
                                          hover:text-indigo-600 dark:hover:text-indigo-400 transition-all duration-300 rounded-lg"
                              >
                                {subcat.icon && <span className="text-sm">{subcat.icon}</span>}
                                <span>{subcat.name}</span>
                              </a>
                            ))}
                            {category.subcategories.length > 3 && (
                              <a
                                href={`/category/${category.slug}`}
                                className="flex items-center gap-2 px-3 py-2 text-sm text-indigo-600 dark:text-indigo-400 
                                          hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 rounded-lg"
                              >
                                <span>+{category.subcategories.length - 3} more...</span>
                              </a>
                            )}
                          </div>
                        )}
                      </div>
                    ))
                  ) : (
                    <div className="flex items-center justify-center py-8 text-gray-500 dark:text-gray-400">
                      <span>No categories available</span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Wishlist */}
          <button className="relative group p-2.5 text-gray-700 dark:text-gray-200 hover:text-red-600 dark:hover:text-red-400 
                            hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-all duration-300">
            <Heart className="h-6 w-6 group-hover:scale-110 transition-transform duration-300" />
            <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs 
                            w-5 h-5 rounded-full flex items-center justify-center font-bold shadow-lg animate-pulse">
              2
            </span>
          </button>

          {/* Cart */}
          <button className="relative group p-2.5 text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400 
                            hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-xl transition-all duration-300">
            <ShoppingCart className="h-6 w-6 group-hover:scale-110 transition-transform duration-300" />
            <span className="absolute -top-1 -right-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xs 
                            w-5 h-5 rounded-full flex items-center justify-center font-bold shadow-lg">
              3
            </span>
          </button>

          {/* Auth */}
          {!isLoggedIn ? (
            <div className="hidden md:flex gap-3">
              <a
                href="/login"
                className="px-4 py-2 rounded-full border border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white transition-all duration-300"
              >
                Login
              </a>
              <a
                href="/register"
                className="px-4 py-2 rounded-full bg-indigo-600 text-white hover:bg-indigo-700 transition-all duration-300"
              >
                Register
              </a>
            </div>
          ) : (
            <div className="relative">
              <button onClick={() => setProfileOpen(!profileOpen)}>
                <User className="h-6 w-6 text-gray-700 dark:text-gray-200 transition-colors duration-300" />
              </button>
              {profileOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-slate-800 shadow-lg rounded-lg overflow-hidden animate-dropdown">
                  {["Profile", "Settings", "Logout"].map((item) => (
                    <a
                      key={item}
                      href={`/${item.toLowerCase()}`}
                      className="block px-4 py-2 hover:bg-indigo-600 dark:hover:bg-indigo-500 hover:text-white transition-all duration-300"
                    >
                      {item}
                    </a>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Dark Mode Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`p-2 rounded-full transition-all duration-300 ${
              darkMode
                ? "bg-indigo-600 text-white hover:bg-indigo-500"
                : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600"
            }`}
          >
            {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-gray-700 dark:text-gray-200 transition-all duration-300"
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white dark:bg-slate-900 px-4 py-3 space-y-3 shadow-lg animate-mobile-dropdown max-h-96 overflow-y-auto">
          <input
            type="text"
            placeholder="Search products..."
            className="w-full rounded-full px-4 py-2 border border-gray-200 dark:border-gray-700
                       bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-200
                       focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
          />
          
          {/* Categories Section */}
          <div className="space-y-2">
            <h3 className="font-semibold text-gray-700 dark:text-gray-300 px-2">Categories</h3>
            {loading ? (
              <div className="flex items-center justify-center py-4">
                <div className="animate-spin h-4 w-4 border-2 border-indigo-600 border-t-transparent rounded-full"></div>
                <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">Loading...</span>
              </div>
            ) : categories.length > 0 ? (
              <div className="space-y-1">
                {categories.slice(0, 8).map((category) => (
                  <a
                    key={category._id}
                    href={`/category/${category.slug}`}
                    className="flex items-center gap-3 px-3 py-2 hover:bg-indigo-600 dark:hover:bg-indigo-500 hover:text-white transition-all duration-300 rounded-lg"
                  >
                    {category.icon && <span className="text-lg">{category.icon}</span>}
                    <span className="font-medium">{category.name}</span>
                  </a>
                ))}
                {categories.length > 8 && (
                  <a
                    href="/categories"
                    className="flex items-center gap-3 px-3 py-2 text-indigo-600 dark:text-indigo-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300 rounded-lg"
                  >
                    <span className="text-lg">➤</span>
                    <span className="font-medium">View All Categories</span>
                  </a>
                )}
              </div>
            ) : (
              <p className="text-gray-500 dark:text-gray-400 px-2 text-sm">No categories available</p>
            )}
          </div>

          {!isLoggedIn ? (
            <div className="flex gap-3 pt-3 border-t border-gray-200 dark:border-gray-700">
              <a
                href="/login"
                className="flex-1 px-4 py-2 rounded-full border border-indigo-600 text-indigo-600 text-center hover:bg-indigo-600 hover:text-white transition-all duration-300"
              >
                Login
              </a>
              <a
                href="/register"
                className="flex-1 px-4 py-2 rounded-full bg-indigo-600 text-white text-center hover:bg-indigo-700 transition-all duration-300"
              >
                Register
              </a>
            </div>
          ) : (
            <div className="space-y-1 pt-3 border-t border-gray-200 dark:border-gray-700">
              {["Profile", "Settings", "Logout"].map((item) => (
                <a
                  key={item}
                  href={`/${item.toLowerCase()}`}
                  className="block px-3 py-2 hover:bg-indigo-600 dark:hover:bg-indigo-500 hover:text-white transition-all duration-300 rounded-lg"
                >
                  {item}
                </a>
              ))}
            </div>
          )}
        </div>
      )}
    </header>
  );
}
