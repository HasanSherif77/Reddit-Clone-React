import "./LoginButton.css";

export default function LoginButton({ onClick }) {
  return (
    <button className="login-btn" onClick={onClick}>
      Log In
    </button>
  );
}
