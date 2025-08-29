import {
  createRootRouteWithContext,
  Link,
  Outlet,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import type { MyRouterContext } from "../Router";
import { ReactBistroLogo } from "../shared/ReactBistroLogo";

const navLinkClassName =
  "text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors [&.active]:text-blue-600 [&.active]:font-semibold";

export const Route = createRootRouteWithContext<MyRouterContext>()({
  errorComponent: (props) => (
    <div>Oops! Something went wrong: {props.error.message}</div>
  ),
  notFoundComponent: () => <h1>Oops! That page doesn't exist.</h1>,
  component: () => (
    <>
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
              <ReactBistroLogo />
              <div className="flex space-x-6">
                <Link to="/" className={navLinkClassName}>
                  Menu
                </Link>
                <Link
                  to="/admin/{-$foodId}"
                  params={{ foodId: undefined }}
                  className={navLinkClassName}
                >
                  Admin
                </Link>
                <Link to="/about" className={navLinkClassName}>
                  About
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>
      <TanStackRouterDevtools />
    </>
  ),
});
