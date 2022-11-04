import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { FormRow } from "../../components";
import { updateUser } from "../../features/user/userSlice";

const Profile = () => {
  const dispatch = useDispatch();
  const { isLoading, user } = useSelector((store) => store.user);
  const [userData, setuserData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    lastName: user?.lastName || "",
    location: user?.location || "",
  });
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setuserData({ ...userData, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, lastName, location } = userData;
    if (!name || !email || !lastName || !location) {
      toast.error("please provide all values");
      return;
    }
    dispatch(updateUser(userData));
  };
  return (
    <section className="minipage">
      <form className="generic-form" onSubmit={handleSubmit}>
        <h2>Profile</h2>
        <div className="form-control">
          <FormRow
            name={"name"}
            value={userData.name}
            handleChange={handleChange}
          />
          <FormRow
            name={"lastName"}
            label={"Last Name"}
            value={userData.lastName}
            handleChange={handleChange}
          />
          <FormRow
            name={"email"}
            type={"email"}
            value={userData.email}
            handleChange={handleChange}
          />
          <FormRow
            name={"location"}
            value={userData.location}
            handleChange={handleChange}
          />
          <div className="save-btn-container">
            <button className="save-btn btn" type="submit" disabled={isLoading}>
              save changes
            </button>
          </div>
        </div>
      </form>
    </section>
  );
};

export default Profile;
