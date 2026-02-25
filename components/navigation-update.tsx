// FILE: Navigation Menu Update
// Add "Webinars" link to your Header component

// ============================================
// FIND YOUR NAVIGATION LINKS SECTION
// ============================================

// Look for code like this in your Header.tsx or Navigation component:

/*
<nav>
  <Link href="/">Home</Link>
  <Link href="/about">About</Link>
  <Link href="/services">Services</Link>
  <Link href="/blog">Blog</Link>
  <Link href="/contact">Contact</Link>
</nav>
*/

// ============================================
// ADD THIS LINK (between Blog and Contact):
// ============================================

<Link 
  href="/webinars" 
  className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
>
  Webinars
</Link>

// ============================================
// COMPLETE EXAMPLE:
// ============================================

export default function Header() {
  return (
    <header className="bg-white shadow-sm">
      <nav className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/">
            <img src="/images/logo.png" alt="Riverr360" className="h-10" />
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-gray-700 hover:text-primary-600 font-medium">
              Home
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-primary-600 font-medium">
              About
            </Link>
            <Link href="/services" className="text-gray-700 hover:text-primary-600 font-medium">
              Services
            </Link>
            <Link href="/blog" className="text-gray-700 hover:text-primary-600 font-medium">
              Blog
            </Link>
            
            {/* ADD THIS WEBINARS LINK */}
            <Link href="/webinars" className="text-gray-700 hover:text-primary-600 font-medium">
              Webinars
            </Link>

            <Link href="/contact" className="text-gray-700 hover:text-primary-600 font-medium">
              Contact
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}

// ============================================
// FOR MOBILE MENU (if you have one):
// ============================================

// Add the same link in your mobile navigation:

<div className="md:hidden">
  <Link href="/" className="block py-2">Home</Link>
  <Link href="/about" className="block py-2">About</Link>
  <Link href="/services" className="block py-2">Services</Link>
  <Link href="/blog" className="block py-2">Blog</Link>
  <Link href="/webinars" className="block py-2">Webinars</Link>  {/* ADD THIS */}
  <Link href="/contact" className="block py-2">Contact</Link>
</div>
