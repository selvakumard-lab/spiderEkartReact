import { useState } from "react";
import { Inbox, LogIn, Settings, User } from "react-feather";
import { Link, useNavigate } from "react-router-dom";
import { LI, UL } from "../../../AbstractElements";
import { Account, LogOut } from "../../../Constant";
const Users = () => {
  const [toggle, setToogle] = useState(true);
  // const history = useNavigate();
  // const Logout = () => {
  //   localStorage.removeItem("profileURL");
  //   localStorage.removeItem("Name");
  //   localStorage.removeItem("token");
  //   history(`${process.env.PUBLIC_URL}/login`);
  //   localStorage.setItem("login", false);
  // };

  const navigate = useNavigate();

  const Logout = () => {
    // 1️⃣ Clear localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("login");
    localStorage.removeItem("authenticated");

    // 2️⃣ Redirect to login page
    navigate("/login", { replace: true });
  };


  const Active = () => setToogle(!toggle);

  return (
    <LI attrLI={{ className: `profile-nav onhover-dropdown` }}>
      <div className="account-user">
        <User onClick={Active} />
      </div>
      <UL attrUL={{ className: "profile-dropdown onhover-show-div" }}>
        <LI>
          <Link to={`/users/user-profile`}>
            <User />
            <span>{Account}</span>
          </Link>
        </LI>
        <LI>
          <Link to={`/users/user-edit`}>
            <i>
              <Settings />
            </i>
            <span>Settings</span>
          </Link>
        </LI>
        <LI attrLI={{ onClick: Logout }}>
          <Link to={`/login`}>
            <LogIn />
            <span>Log Out</span>
          </Link>
        </LI>
      </UL>
    </LI>
  );
};

export default Users;
