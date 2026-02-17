// import React, { useState, useEffect } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { Form, FormGroup, Input, Label } from "reactstrap";
// import { Btn, H4, P } from "../../../AbstractElements";
// import api from "../../../Services/api";

// const TenantLoginTab = () => {

//   /* 🔹 ALL HOOKS AT TOP */
//   const { tenantSlug } = useParams();
//   const navigate = useNavigate();

//   const [tenant, setTenant] = useState(null);
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   /* 🔹 FETCH TENANT BY SLUG */
//   useEffect(() => {
//     api
//       .get(`/auth/by-slug/${tenantSlug}`)
//       .then((res) => {
//         setTenant(res.data.data);
//       })
//       .catch(() => {
//         setError("404 Not Found Invalid Tenant URL");
//       });
//   }, [tenantSlug]);

//   /* 🔹 LOGIN HANDLER */
//   const TenantloginAuth = async (e) => {
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

//       localStorage.setItem("token", res.data.token);
//       localStorage.setItem("user", JSON.stringify(res.data.user));

//       // if (tenantSlug) {
//         navigate(`/${tenantSlug}/dashboard/default`, { replace: true });
//       // } else {
//       //   navigate("/dashboard/default", { replace: true });
//       // }


//     } catch (err) {
//       setError(err.response?.data?.message || "Invalid email or password");
//     } finally {
//       setLoading(false);
//     }
//   };

//   /* 🔹 SAFE CONDITIONAL RENDERING */
//   if (error) return <h2>{error}</h2>;
//   if (!tenant) return <h2>Loading...</h2>;

//   return (
//     <Form className="theme-form" onSubmit={TenantloginAuth}>
      
//       <img
//         src={`http://localhost:5000/${tenant.project_image}`}
//         alt="logo"
//         width="150"
//         className="mb-3"
//       />


//       {error && <p className="text-danger">{error}</p>}

//       <FormGroup>
//         <Label>Email Address</Label>
//         <Input
//           type="email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           placeholder="Enter email"
//         />
//       </FormGroup>

//       <FormGroup className="position-relative">
//         <Label>Password</Label>
//         <Input
//           type={showPassword ? "text" : "password"}
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           placeholder="Enter password"
//         />

//         <span
//           onClick={() => setShowPassword(!showPassword)}
//           style={{
//             position: "absolute",
//             right: "15px",
//             top: "38px",
//             cursor: "pointer",
//           }}
//         >
//           <i className={`fa ${showPassword ? "fa-eye-slash" : "fa-eye"}`} />
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

// export default TenantLoginTab;



import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Form, FormGroup, Input, Label } from "reactstrap";
import { Btn, H4 } from "../../../AbstractElements";
import api from "../../../Services/api";

const TenantLoginTab = () => {

  const { tenantSlug } = useParams();
  const navigate = useNavigate();
  
  const [tenant, setTenant] = useState(null);
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
    
  window.onCaptchaSuccess = function (token) {
    setCaptchaToken(token);
  };

  useEffect(() => {
    api.get(`/auth/by-slug/${tenantSlug}`)
      .then(res => setTenant(res.data.data))
      .catch(() => setError("404 Not Found Invalid Tenant URL"));
  }, [tenantSlug]);

  const sendOtp = async (e) => {
    e.preventDefault();

    if (!captchaToken)
      return setError("Please verify you are not a robot");

    try {
      setLoading(true);
      setError("");

      await api.post("/auth/send-otp", {
        email,
        captcha: captchaToken,
        tenantSlug
      });

      setStep(2);

    } catch (err) {
      setError(err.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  /* 🔹 VERIFY OTP */
  const verifyOtp = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await api.post("/auth/verify-otp", {
        email,
        otp,
        tenantSlug
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      navigate(`/${tenantSlug}/dashboard/default`, { replace: true });

    } catch (err) {
      setError(err.response?.data?.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  if (error) return <h2>{error}</h2>;
  if (!tenant) return <h2>Loading...</h2>;

  return (
    <Form className="theme-form" onSubmit={step === 1 ? sendOtp : verifyOtp}>

      {/* Tenant Logo */}
      <img
        src={`http://localhost:5000/${tenant.project_image}`}
        alt="logo"
        width="100%"
        className="mb-3"
      />

      <H4 className="mb-3">
        Sign In <span className="text-muted fs-6">| Email OTP Login</span>
      </H4>

      {error && <p className="text-danger">{error}</p>}

      {/* EMAIL */}
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

      {/* CAPTCHA */}
      {step === 1 && (
        <div className="mb-3">
          <div ref={captchaRef}></div>
        </div>
      )}

      {/* OTP */}
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

export default TenantLoginTab;
