// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Form, FormGroup, Input, Label } from "reactstrap";
// import { Btn, H4, H6, P } from "../../../AbstractElements";
// import api from "../../../Services/api";

// // import { EmailAddress, OrSignInWith, Password, SignIn } from "../../../Constant";
// // import FormHeader from "./FormHeader";
// // import FormPassword from "./FormPassword";
// const LoginTab = () => {

//   const navigate = useNavigate();

//   const [showPassword, setShowPassword] = useState(false);

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");


//   const loginAuth = async (e) => {
//     e.preventDefault();

//     if (!email || !password) {
//       setError("Email and password are required");
//       return;
//     }

//     try {
//       setLoading(true);
//       setError("");

//       const res = await api.post("/auth/login", {
//         email,
//         password,
//       });

//       // ✅ SAVE AUTH DATA (ONLY THIS)
//       localStorage.setItem("token", res.data.token);
//       localStorage.setItem("user", JSON.stringify(res.data.user));

//       console.log("LOGIN SUCCESS");

//       // ✅ REDIRECT
//       navigate("/dashboard/default", { replace: true });

//     } catch (err) {
//       setError(err.response?.data?.message || "Invalid email or password");
//     } finally {
//       setLoading(false);
//     }
//   };



//   return (
//     <Form className="theme-form" onSubmit={loginAuth}>
//       <H4>Sign In</H4>
//       <P>Enter your email & password to login</P>

//       {error && <p className="text-danger">{error}</p>}

//       <FormGroup>
//         <Label className="col-form-label">Email Address</Label>
//         <Input
//           className="form-control"
//           type="email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           placeholder="Enter email"
//         />
//       </FormGroup>

//       <FormGroup className="position-relative">
//         <Label className="col-form-label">Password</Label>

//         <Input
//           className="form-control pe-5"
//           type={showPassword ? "text" : "password"}
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           placeholder="Enter password"
//         />

//         {/* 👁 Eye Icon */}
//         <span
//           onClick={() => setShowPassword(!showPassword)}
//           style={{
//             position: "absolute",
//             right: "15px",
//             top: "48px",
//             cursor: "pointer",
//             zIndex: 10,
//           }}
//         >
//           <i className={`fa ${showPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
//         </span>
//       </FormGroup>


//       <Btn
//         attrBtn={{
//           color: "primary",
//           className: "d-block w-100 mt-2",
//           disabled: loading,
//         }}
//       >
//         {loading ? "Signing In..." : "Sign In"}
//       </Btn>
//     </Form>
//   );
  
// };

// export default LoginTab;



import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Form, FormGroup, Input, Label } from "reactstrap";
import { Btn, H4 } from "../../../AbstractElements";

import logo from "../../../assets/images/logo/logo10.png";

import api from "../../../Services/api";

const LoginTab = () => {

  
  const navigate = useNavigate();
  
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [captchaToken, setCaptchaToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  const captchaRef = useRef(null);

  useEffect(() => {
    const timer = setInterval(() => {
      if (window.grecaptcha && captchaRef.current && step === 1) {
        window.grecaptcha.render(captchaRef.current, {
          sitekey: "6LcjmW4sAAAAALJeT2ue0Pt_huYrxTj7u8PTVJS2",
          
          callback: (token) => setCaptchaToken(token),
        });
        clearInterval(timer);
      }
    }, 500);

    return () => clearInterval(timer);
  }, [step]);
  // 🔹 Capture captcha token
  window.onCaptchaSuccess = function (token) {
    setCaptchaToken(token);
  };

  // SEND OTP
  const sendOtp = async (e) => {
    e.preventDefault();

    if (!captchaToken)
      setError("Please verify you are not a robot");

    try {
      setLoading(true);
      setError("");

      const res = await api.post("/auth/send-otp", {
        email,
        captcha: captchaToken,
      });

      if(res.data.success){
        setStep(2);
      }else{
        setError(res.data.message || "some went wrong");
      }

    } catch (err) {
      setError(err.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  // VERIFY OTP
  const verifyOtp = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await api.post("/auth/verify-otp", {
        email,
        otp,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      navigate("/dashboard/default", { replace: true });

    } catch (err) {
      setError(err.response?.data?.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form className="theme-form" onSubmit={step === 1 ? sendOtp : verifyOtp}>

      <div className="mb-4">
        <img
          src={logo}
          alt="Project Logo"
          style={{ width: "100%", height: "auto" }}
        />
      </div>

      {error && <p className="text-danger">{error}</p>}


      <H4 className="mb-3">
        Sign In <span className="text-muted fs-6">| Email OTP Login</span>
      </H4>



      <FormGroup>
        <Label>Email Address</Label>
        <Input
          type="email"
          value={email}
          disabled={step === 2}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter email"
          required
        />
      </FormGroup>

      {step === 1 && (
        <div className="mb-3">
          <div ref={captchaRef}></div>
        </div>
      )}



      {/* OTP FIELD */}
      {step === 2 && (
        <FormGroup>
          <Label>Enter OTP</Label>
          <Input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter 6 digit OTP"
            required
          />
        </FormGroup>
      )}

      <Btn attrBtn={{ color: "primary", className: "w-100", disabled: loading }}>
        {loading
          ? "Please wait..."
          : step === 1
          ? "Send OTP"
          : "Verify & Login"}
      </Btn>
    </Form>
  );
};

export default LoginTab;
