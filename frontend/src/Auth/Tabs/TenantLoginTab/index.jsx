import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Form, FormGroup, Input, Label } from "reactstrap";
import { Btn, H4, P } from "../../../AbstractElements";
import api from "../../../Services/api";

const TenantLoginTab = () => {

  /* 🔹 ALL HOOKS AT TOP */
  const { tenantSlug } = useParams();
  const navigate = useNavigate();

  const [tenant, setTenant] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  /* 🔹 FETCH TENANT BY SLUG */
  useEffect(() => {
    api
      .get(`/auth/by-slug/${tenantSlug}`)
      .then((res) => {
        setTenant(res.data.data);
      })
      .catch(() => {
        setError("404 Not Found Invalid Tenant URL");
      });
  }, [tenantSlug]);

  /* 🔹 LOGIN HANDLER */
  const TenantloginAuth = async (e) => {
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

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      // if (tenantSlug) {
        navigate(`/${tenantSlug}/dashboard/default`, { replace: true });
      // } else {
      //   navigate("/dashboard/default", { replace: true });
      // }


    } catch (err) {
      setError(err.response?.data?.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  /* 🔹 SAFE CONDITIONAL RENDERING */
  if (error) return <h2>{error}</h2>;
  if (!tenant) return <h2>Loading...</h2>;

  return (
    <Form className="theme-form" onSubmit={TenantloginAuth}>
      
      <img
        src={`http://localhost:5000/${tenant.project_image}`}
        alt="logo"
        width="150"
        className="mb-3"
      />


      {error && <p className="text-danger">{error}</p>}

      <FormGroup>
        <Label>Email Address</Label>
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter email"
        />
      </FormGroup>

      <FormGroup className="position-relative">
        <Label>Password</Label>
        <Input
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password"
        />

        <span
          onClick={() => setShowPassword(!showPassword)}
          style={{
            position: "absolute",
            right: "15px",
            top: "38px",
            cursor: "pointer",
          }}
        >
          <i className={`fa ${showPassword ? "fa-eye-slash" : "fa-eye"}`} />
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
};

export default TenantLoginTab;