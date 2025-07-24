import notfoundimg from "../../assets/Images/404.svg";

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
      <img src={notfoundimg} alt="404 Not Found" className="max-w-xs mb-6" />
      <h1 className="text-4xl font-bold mb-2">404 - Page Not Found</h1>
      <p className="text-gray-600 mb-6">
        Sorry, the page you are looking for does not exist or has been moved.
      </p>
      <a href="/" className="btn btn-primary">
        Go to Home
      </a>
    </div>
  );
}

export default NotFound;
