import { Link, useLocation } from "react-router-dom";

export default function Breadcrumb() {
  const location = useLocation();

  // Split path → /about/team → ["about", "team"]
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <div className="bg-[#4b5d66] text-white px-6 py-3 text-sm font-medium">
      <div className="max-w-[1380px] mx-auto flex items-center gap-2">
        
        {/* Home */}
        <Link to="/" className="hover:underline">
          Home
        </Link>

        {/* Dynamic Paths */}
        {pathnames.map((value, index) => {
          const to = "/" + pathnames.slice(0, index + 1).join("/");

          return (
            <span key={to} className="flex items-center gap-2">
              <span>-</span>
              <Link to={to} className="hover:underline capitalize">
                {value.replace(/-/g, " ")}
              </Link>
            </span>
          );
        })}
      </div>
    </div>
  );
}