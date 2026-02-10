import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, FormGroup, Input, Label } from "reactstrap";
import { Btn, H4, H6, P } from "../../../AbstractElements";
import api from "../../../Services/api";

// import { EmailAddress, OrSignInWith, Password, SignIn } from "../../../Constant";
// import FormHeader from "./FormHeader";
// import FormPassword from "./FormPassword";
const LoginTab = () => {

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");


  const loginAuth = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Email and password are required");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const res = await api.post("/auth/login", {
        email,
        password,
      });

      // ✅ SAVE AUTH DATA (ONLY THIS)
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      console.log("LOGIN SUCCESS");

      // ✅ REDIRECT
      navigate("/dashboard/default", { replace: true });

    } catch (err) {
      setError(err.response?.data?.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };



  return (
    <Form className="theme-form" onSubmit={loginAuth}>
      <H4>Sign In</H4>
      <P>Enter your email & password to login</P>

      {error && <p className="text-danger">{error}</p>}

      <FormGroup>
        <Label className="col-form-label">Email Address</Label>
        <Input
          className="form-control"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter email"
        />
      </FormGroup>

      <FormGroup className="position-relative">
        <Label className="col-form-label">Password</Label>

        <Input
          className="form-control pe-5"
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password"
        />

        {/* 👁 Eye Icon */}
        <span
          onClick={() => setShowPassword(!showPassword)}
          style={{
            position: "absolute",
            right: "15px",
            top: "48px",
            cursor: "pointer",
            zIndex: 10,
          }}
        >
          <i className={`fa ${showPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
        </span>
      </FormGroup>


      <Btn
        attrBtn={{
          color: "primary",
          className: "d-block w-100 mt-2",
          disabled: loading,
        }}
      >
        {loading ? "Signing In..." : "Sign In"}
      </Btn>
    </Form>
  );



  // return (
  //   <Form className="theme-form">
  //     <H4>{"Sign In With Simple Login"}</H4>
  //     <P>{"Enter your email & password to login"}</P>
  //     <FormGroup>
  //       <Label className="col-form-label">{EmailAddress}</Label>
  //       <Input className="form-control" type="email" onChange={(e) => setEmail(e.target.value)} value={email} />
  //     </FormGroup>
  //     <FormGroup className="position-relative">
  //       <Label className="col-form-label">{Password}</Label>
  //       <div className="position-relative">
  //         <Input className="form-control" type={togglePassword ? "text" : "password"} autoComplete="" onChange={(e) => setPassword(e.target.value)} value={password} />
  //         <div className="show-hide" onClick={() => setTogglePassword(!togglePassword)}>
  //           <span className={togglePassword ? "" : "show"}></span>
  //         </div>
  //       </div>
  //     </FormGroup>
  //     <FormPassword />
  //     <div>
  //       <Btn attrBtn={{ color: "primary", className: "d-block w-100 mt-2", onClick: (e) => loginAuth(e) }}>{SignIn}</Btn>
  //     </div>
  //     <div className="login-social-title">
  //       <H6>{OrSignInWith}</H6>
  //     </div>
  //     <FormHeader />
  //   </Form>
  // );

  
};

export default LoginTab;
