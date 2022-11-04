import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { verifyUser } from "../features/user/userSlice";
import { Logo } from "../components";
import { Link } from "react-router-dom";

const VerifyEmail = () => {
  const dispatch = useDispatch();
  const params = new URLSearchParams(window.location.search);
  const token = params.get("token");
  const email = params.get("email");

  React.useEffect(() => {
    dispatch(verifyUser({ token, email }));
    // eslint-disable-next-line
  }, [email, token]);

  const { info, isVerified } = useSelector((store) => store.user);
  if (!isVerified) {
    return <h4>{info}</h4>;
  }
  return (
    <main>
      <section className="section-center">
        <Logo />
        <p className="success-text">{info}</p>
        <Link to="/register" className="btn">
          Login
        </Link>
      </section>
    </main>
  );
};

export default VerifyEmail;
