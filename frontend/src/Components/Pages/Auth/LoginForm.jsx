// import  { useState } from 'react';
// import { Facebook, Instagram, Linkedin, Twitter } from 'react-feather';
// import { Link } from 'react-router-dom';
// import { Form, FormGroup, Input, Label } from 'reactstrap';
// import { Btn, H4, H6, P, UL, LI } from '../../../AbstractElements';
// import { CreateAccount, EmailAddress, ForgotPassword, Signinaccount, Password, RememberPassword } from '../../../Constant';


// const LoginForm = () => {   
//     const [showPass, setShowPass] = useState(false);

//     return (
//             <div className="login-main">
//             <Form className="theme-form login-form">
//                 <div className="login-header text-center">
//                     <H4>{Signinaccount}</H4>
//                     <P>Enter your email & password to login</P>
//                 </div>
//                 <FormGroup>
//                     <Label>{EmailAddress}</Label>
//                     <div className="input-group">
//                         <Input type="email" required="" placeholder="Test@gmail.com" />
//                     </div>
//                 </FormGroup>
//                 <FormGroup className='position-relative pass-hide'>
//                     <Label>{Password}</Label>
//                     <Input className="form-control" type={showPass ? "text" : "Password"} autoComplete='' name="login[password]" required="" placeholder="*********" />
//                     <div className="show-hide">
//                         <span className="show" onClick={()=>{setShowPass(!showPass) }}></span>
//                     </div>
//                 </FormGroup>
//                 <FormGroup className='position-relative'>
//                     <div className="checkbox">
//                         <Input id="checkbox1" type="checkbox" />
//                         <Label className="text-muted" for="checkbox1">{RememberPassword}</Label>
//                     </div>
//                     <Link to={`${process.env.PUBLIC_URL}/authentication/forget-pwd`} className="link">
//                         {ForgotPassword}?
//                     </Link>
//                 </FormGroup>
//                 <FormGroup>
//                     <Btn attrBtn={{ color: 'primary', className: 'w-100', type: 'submit' }} >SIGN IN </Btn>
//                 </FormGroup>
//                 <div className="login-social-title">
//                     <H6>Or Sign in with</H6>
//                 </div>
//                 <FormGroup>
//                     <UL attrUL={{ className: 'simple-list login-social flex-row' }}>
//                         <LI>
//                             <a href="https://in.linkedin.com/">
//                                <Linkedin/>
//                             </a>
//                         </LI>
//                         <LI>
//                             <a href="https://twitter.com/i/flow/login">
//                                <Twitter/>
//                             </a>
//                         </LI>
//                         <LI>
//                             <a href="https://www.instagram.com/">
//                                 <Instagram/>
//                             </a>
//                         </LI>
//                         <LI>
//                             <a href="https://www.facebook.com/">
//                             <Facebook/>
//                             </a>
//                         </LI>
//                     </UL>
//                 </FormGroup>
//                 <P attrPara={{ className: 'text-center mt-4 mb-0' }}>Don't have account?
//                     <Link to={`${process.env.PUBLIC_URL}/authentication/create-pwd`} className="ms-2">
//                         {CreateAccount}
//                     </Link>
//                 </P>
//             </Form>
//             </div>
//     );
// };

// export default LoginForm;








import React, { useState, useEffect, useRef } from "react";

import { Facebook, Instagram, Linkedin, Twitter } from 'react-feather';
import { Link, useNavigate } from 'react-router-dom';
import { Form, FormGroup, Input, Label } from 'reactstrap';
import { Btn, H4, H6, P, UL, LI } from '../../../AbstractElements';
import { EmailAddress, ForgotPassword, Signinaccount, RememberPassword } from '../../../Constant';
import api from "../../../Services/api";


const LoginForm = () => {  
    
    const navigate = useNavigate();
    
    const [step, setStep] = useState(1);
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [captchaToken, setCaptchaToken] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    
    const captchaRef = useRef(null);

    const captchaWidgetId = useRef(null);

    useEffect(() => {
    const timer = setInterval(() => {
        if (
        window.grecaptcha &&
        captchaRef.current &&
        step === 1 &&
        captchaWidgetId.current === null
        ) {
        captchaWidgetId.current = window.grecaptcha.render(captchaRef.current, {
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
            <div className="login-main">
            <Form className="theme-form login-form" onSubmit={step === 1 ? sendOtp : verifyOtp}>
                <div className="login-header text-center">
                    <H4>{Signinaccount}</H4>
                    <P>Enter your email & OTP to login</P>
                </div>

                {error && <p className="text-danger">{error}</p>}

                <FormGroup>
                    <Label>{EmailAddress}</Label>
                    <div className="input-group">
                        <Input
                          type="email"
                          value={email}
                          disabled={step === 2}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Enter email"
                          required
                        />
                    </div>
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
                <FormGroup className='position-relative'>
                    <div className="checkbox">
                        <Input id="checkbox1" type="checkbox" />
                        <Label className="text-muted" for="checkbox1">{RememberPassword}</Label>
                    </div>
                    <Link to={`${process.env.PUBLIC_URL}/authentication/forget-pwd`} className="link">
                        {ForgotPassword}?
                    </Link>
                </FormGroup>
                <FormGroup>
                    <Btn attrBtn={{ color: "primary", className: "w-100", disabled: loading }}>
                            {loading
                              ? "Please wait..."
                              : step === 1
                              ? "Get Login Code"
                              : "Verify & Login"}
                          </Btn>
                </FormGroup>
                <div className="login-social-title">
                    <H6>Or Sign in with</H6>
                </div>
                <FormGroup>
                    <UL attrUL={{ className: 'simple-list login-social flex-row' }}>
                        <LI>
                            <a href="https://in.linkedin.com/">
                               <Linkedin/>
                            </a>
                        </LI>
                        <LI>
                            <a href="https://twitter.com/i/flow/login">
                               <Twitter/>
                            </a>
                        </LI>
                        <LI>
                            <a href="https://www.instagram.com/">
                                <Instagram/>
                            </a>
                        </LI>
                        <LI>
                            <a href="https://www.facebook.com/">
                            <Facebook/>
                            </a>
                        </LI>
                    </UL>
                </FormGroup>
                {/* <P attrPara={{ className: 'text-center mt-4 mb-0' }}>Don't have account?
                    <Link to={`${process.env.PUBLIC_URL}/authentication/create-pwd`} className="ms-2">
                        {CreateAccount}
                    </Link>
                </P> */}
            </Form>
            </div>
    );
};

export default LoginForm;