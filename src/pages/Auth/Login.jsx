import axios from "axios";
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { loginRoute } from "../../routes/APIRoutes";
import { getCookie, deleteCookie } from "../../lib/cookieHelper";

export const Login = ({ setIsAuth }) => {
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    const loginData = {
      email: e.target.email.value,
      password: e.target.password.value,
    };

    const { data } = await axios.post(loginRoute, loginData);
    console.log(data);
    // Set a cookie in the browser
    if (data.success) {
      deleteCookie("userId");
      document.cookie = `userId=${data.id}; path=/; max-age=86400;`;
      setIsAuth(getCookie("userId"));
    }

    navigate("/");
    // Force a reload of the page
    window.location.reload();
  }

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="py-8 px-4 mx-auto max-w-screen-sm lg:py-16 grid gap-8 lg:gap-16 justify-items-stretch">
        <div>
          <div className="w-full lg:w-xl p-6 space-y-8 sm:p-8 bg-white rounded-lg shadow-xl dark:bg-gray-800">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Sign in to Miaw
            </h2>
            <form className="mt-8 space-y-6" onSubmit={handleLogin}>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@example.com"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full px-5 py-3 text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 sm:w-auto dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Login to your account
              </button>
              <div className="text-sm font-medium text-gray-900 dark:text-white">
                Not registered yet?{" "}
                <NavLink
                  to="/register"
                  className="text-blue-600 hover:underline dark:text-blue-500"
                >
                  Create account
                </NavLink>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
