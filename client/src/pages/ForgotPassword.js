import React from "react";
import { FormRow, Logo } from "../components";

const ForgotPassword = () => {
  return (
    <main>
      <section className="section-container register-container ">
        <form className="register-form">
          <Logo />
          <p>Enter your email </p>
          <FormRow title={"email"} type="email" />
          <div className="register-btn-container">
            <button type="submit" className="register-btn">
              ResetPassword
            </button>
          </div>
        </form>
      </section>
    </main>
  );
};

export default ForgotPassword;
