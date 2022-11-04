import React, { useState } from "react";
import { FormRow, Logo } from "../components";
import validator from "validator";
import { toast } from "react-toastify";
import { loginUser, registerUser } from "../features/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
const initialState = { email: "", name: "", password: "", isMember: true };
const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading, isregistered, user } = useSelector((store) => store.user);

  const [values, setvalues] = useState(initialState);
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setvalues({ ...values, [name]: value });
  };
  const handleSubmit = (e) => {
    const { email, name, password, isMember } = values;
    e.preventDefault();
    // isStrongPassword(str [, options])
    if (!email || !password || (!isMember && !name)) {
      toast.error("please provide all values");
      return;
    }
    const strongpass = validator.isStrongPassword(password, {
      minLength: 8,
      minNumbers: 1,
      minSymbols: 1,
    });
    if (!isMember && !strongpass) {
      toast.error(
        "password should be atleast 8 characters, must contain atleast one number and one symbol"
      );
      return;
    }

    if (isMember) {
      dispatch(loginUser({ email, password }));
      return;
    }
    dispatch(registerUser({ email, password, name }));
  };
  React.useEffect(() => {
    if (isregistered) {
      navigate("/success");
    }
    // eslint-disable-next-line
  }, [isregistered]);
  React.useEffect(() => {
    if (user) {
      navigate("/");
    }
    // eslint-disable-next-line
  }, [user]);
  return (
    <main>
      <section className="section-container register-container">
        <form className="register-form" onSubmit={handleSubmit}>
          <div className="logo-container">
            <Logo />
          </div>
          <h3>{values.isMember ? "Login" : "Register"}</h3>
          {values.isMember || (
            <FormRow
              name={"name"}
              value={values.name}
              handleChange={handleChange}
            />
          )}
          <FormRow
            name={"email"}
            type="email"
            value={values.email}
            handleChange={handleChange}
          />
          <FormRow
            name={"password"}
            type="password"
            value={values.password}
            handleChange={handleChange}
          />
          <div className="register-btn-container">
            <button type="submit" className="register-btn" disabled={isLoading}>
              {values.isMember ? "Login" : "Register"}
            </button>
            {values.isMember ? (
              <p>
                Not a member yet?
                <button
                  type="button"
                  onClick={() =>
                    setvalues({ ...values, isMember: !values.isMember })
                  }
                >
                  SignUp
                </button>
              </p>
            ) : (
              <p>
                Already a member?
                <button
                  onClick={() =>
                    setvalues({ ...values, isMember: !values.isMember })
                  }
                  type="button"
                >
                  Login
                </button>
              </p>
            )}
            {values.isMember && (
              <p>
                Forgot password?
                <Link to="/forgot-password">Forgot password</Link>
              </p>
            )}
          </div>
        </form>
      </section>
    </main>
  );
};

export default Register;
