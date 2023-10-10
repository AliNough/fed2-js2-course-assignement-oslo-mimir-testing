/* import LoginForm from "../components/login-form/index"; */
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import logo from "../assets/Y_logo.png";
/**
 * Contains form for logging a registered user profile.
 * @see https://docs.noroff.dev/social-endpoints/authentication
 */

/** *Reusable Input and Button Components 
 * @author Cnbergh*/

const Input = ({ type, placeholder, value, onChange, required, minLength }) => (
  <input
    type={type}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    required={true}
    minLength={4}
    className="bg-neutral-100 border-2 border-orange-100 text-gray-900 leading-tight tracking-tight sm:text-sm rounded-3xl focus:ring-primary-600 focus:border-primary-600 block w-full min-w-[220px] sm:min-w-[300px] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    aria-label={placeholder}
  />
);

const CustomButton = ({ label, onClick, icon }) => (
  <button onClick={onClick} className="bg-neutral-100 text-gray-900 leading-tight tracking-tight px-4 py-2 rounded-3xl w-full my-2 border-2 border-[#F5F5F5] hover:border-white dark:hover:bg-gray-100 dark:bg-gray-200 dark:border-gray-200 shadow-custom">
    {icon && <img src={icon} alt={label} className="inline-block mr-2 w-7 h-7" />}
    {label}
  </button>
);

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();
  const [spin, setSpin] = useState(false);
  /* const [email, setEmail] = useState('');
  const [password, setPassword] = useState(''); */

  const navigateToHome = () => {
    setTimeout(() => {
      navigate({ to: "/" });
    }, 2000);
  };

  const handleOnSubmit = async (event) => {
    event.preventDefault();

    const { email, password } = event.target.elements;

    const payload = {
      email: email.value,
      password: password.value,
    };

    try {
      const res = await fetch(
        "https://api.noroff.dev/api/v1/social/auth/login",
        {
          method: "POST",
          body: JSON.stringify(payload),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      );

      const data = await res.json();

      localStorage.setItem("access_token", data.accessToken);
      setData(data);
      setIsSuccess(res.ok);
      navigateToHome();
    } catch (error) {
      console.warn("An error occurred", error);
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  if (error) return <div>An error occurred: {error?.message}</div>;
  return (
    <div className="p-4 rounded-lg dark:bg-gray-900 md:p-10">
      <div className="flex items-center justify-center">
        <img className={`h-22 sm:h-24 md:h-26 lg:h-28 xl:h-30 my-5 logo dark:invert ${spin ? 'spin' : ''}`} src={logo}></img>
      </div>
      <h1 className="mt-2 mb-5 text-3xl font-bold sm:text-3xl md:text-4xl lg:text-5xl"><p className="text-sm text-white dark:text-gray-700">is</p>Better than X!</h1>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        {isSuccess ? (
          <section>
            <p className="text-center text-green-900">
              👋 Hi {data?.name}. You will now redirect to the home page!
            </p>
          </section>
        ) : (
          <section>
            <div className="w-full mt-1 bg-orange-200 border-2 border-orange-100 rounded-3xl md:mt-2 sm:max-w-md xl:p-1 dark:bg-gray-800 dark:border-gray-700">
              <div className="p-6 space-y-4 sm:space-y-5 md:space-y-7 sm:p-8">
                <h2 className="font-bold leading-tight tracking-tight text-gray-800 text-l sm:text-xl md:text-2xl lg:text-2xl dark:text-white">
                  Sign in to your account
                </h2>
                <form className="p-1 space-y-4 md:space-y-6" action="/profile" onSubmit={handleOnSubmit}>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Email address
                    </label>
                    <div className="mt-2">
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        placeholder="Email"
                        autoComplete="email"
                        /* value={email}
                        onChange={(e) => setEmail(e.target.value)} required={true} */
                        defaultValue="first.last@stud.noroff.no"
                        className="px-1 block w-full rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                  <div className="mt-2">
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      required
                      placeholder="Password"
                      autoComplete="current-password"
                      /* value={password} onChange={(e) => setPassword(e.target.value)} required={true} minLength={4} */
                      defaultValue="UzI1NiIsInR5cCI"
                      className="block w-full rounded-md border-0 px-1 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 ml-2 border border-gray-100 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" />
                      </div>
                      <div className="ml-1 text-sm">
                        <label htmlFor="remember" className="text-xs font-light text-gray-600 dark:text-gray-300 sm:text-xs md:text-xs lg:text-sm">Remember me</label>
                      </div>
                    </div>
                    <a href="#" className="ml-1 text-xs font-medium text-gray-700 dark:text-gray-400 sm:text-sm md:text-sm lg:text-sm text-primary-600 hover:underline">Forgot password?</a>
                  </div>
                  <div>
                    <button
                      disabled={isLoading}
                      type="submit"
                      className="w-full px-4 py-2 my-2 leading-tight tracking-tight text-white bg-blue-500 border-2 border-blue-500 rounded-3xl hover:border-blue-400 shadow-custom"
                    >
                      {isLoading ? "signing in" : "Login"}
                    </button>
                    <p className="text-xs font-light text-gray-700 sm:text-sm dark:text-gray-400">Not a member?{" "}
                      <a
                        href="/register"
                        className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                      >
                        Sign up now
                      </a>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </section >
        )
        }
      </div >
    </div >
  );
}
