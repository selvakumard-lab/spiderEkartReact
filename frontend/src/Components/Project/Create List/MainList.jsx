import { useState } from 'react';
import { Col, Form,  Label, Row } from 'reactstrap';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
// import ProjectAppContext from '../../../Helper/Project';
import { Btn } from '../../../AbstractElements';
//  import { Add, ProjectRate, ProjectType, ClientName, Cancel, EnterSomeDetails, ProjectTitle, Priority, ProjectSize, StartingDate, EndingDate } from '../../../Constant';
// import MainTitle from './MainTitle';
// import MainType from './MainType';
// import DropItem from './DropItem';
// import MainDates from './MainDates';
// import MainPriority from './MainPriority';
import { toast } from "react-toastify";
import api from "../../../Services/api";



const MainList = () => {
    
    // const { register, handleSubmit, formState: { errors } } = useForm();
    // const { addNewProject } = useContext(ProjectAppContext);
    // const history = useNavigate();
    // const AddProject = data => {
    //     addNewProject(data);
    //     history(`project/project-list`);
    // };

    
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    
    const [showPassword, setShowPassword] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    // 🔹 SUBMIT TENANT
    const handleTenantSubmit = async (data) => {
        try {
            setLoading(true);

            const formData = new FormData();

            formData.append("company_name", data.company_name);
            formData.append("client_name", data.client_name);
            formData.append("domain_name", data.domain_name);
            formData.append("domain_url", data.domain_url);
            formData.append("project_slug", data.project_slug);
            formData.append("username", data.username);
            formData.append("password", data.password);
            formData.append("plan_id", data.plan_id);
            formData.append("start_date", data.start_date);
            formData.append("end_date", data.end_date);

            // 👇 file
            formData.append("project_image", data.project_image[0]);

            await api.post("/tenants", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
            });

            toast.success("Tenant created successfully");
            reset();
            navigate("/project/project-list");

        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to create tenant");
        } finally {
            setLoading(false);
        }
    };


    return (

            <Form className="theme-form" onSubmit={handleSubmit(handleTenantSubmit)}>

                {/* Company & Client */}
                <Row>
                    <Col sm="4">
                        <div className="mb-3">
                            <Label>Company Name</Label>
                            <input
                                className="form-control"
                                placeholder="Enter company name"
                                {...register("company_name", { required: true })}
                            />
                            {errors.company_name && (
                            <span className="text-danger">Company name is required</span>
                            )}
                        </div>
                    </Col>

                    <Col sm="4">
                        <div className="mb-3">
                            <Label>Client Name</Label>
                            <input
                            className="form-control"
                            placeholder="Enter client name"
                            {...register("client_name", { required: true })}
                            />
                            {errors.client_name && (
                            <span className="text-danger">Client name is required</span>
                            )}
                        </div>
                    </Col>

                    <Col sm="4">
                        <div className="mb-3">
                            <Label>Domain Name</Label>
                            <input
                            className="form-control"
                            placeholder="example.com"
                            {...register("domain_name", { required: true })}
                            />
                            {errors.domain_name && (
                            <span className="text-danger">Domain name is required</span>
                            )}
                        </div>
                    </Col>
                </Row>

                <Row>
                    <Col sm="6">
                        <div className="mb-3">
                        <Label>Domain URL</Label>
                        <input
                            className="form-control"
                            placeholder="https://example.com"
                            {...register("domain_url", {
                            required: "Domain URL is required",
                            pattern: {
                                value: /^(https?:\/\/)/,
                                message: "URL must start with http:// or https://",
                            },
                            })}
                        />
                        {errors.domain_url && (
                            <span className="text-danger">{errors.domain_url.message}</span>
                        )}
                        </div>
                    </Col>
                    <Col sm="6">
                        <div className="mb-3">
                        <Label>Project Image</Label>
                        <input
                            type="file"
                            className="form-control"
                            accept="image/png, image/jpeg, image/jpg"
                            {...register("project_image", {
                            required: "Project image is required",
                            validate: {
                                fileType: (files) =>
                                ["image/jpeg", "image/png", "image/jpg"].includes(files[0]?.type) ||
                                "Only JPG, JPEG, PNG allowed",
                                fileSize: (files) =>
                                files[0]?.size < 2 * 1024 * 1024 ||
                                "Image must be less than 2MB",
                            },
                            })}
                        />
                        {errors.project_image && (
                            <span className="text-danger">{errors.project_image.message}</span>
                        )}
                        </div>
                    </Col>
                </Row>


                {/* Username & Password */}
                <Row>
                    <Col sm="4">
                        <div className="mb-3">
                            <Label>Project Slug</Label>
                            <input
                            className="form-control"
                            placeholder="Project Slug value"
                            {...register("project_slug", {
                                required: "Project base URL is required",
                                pattern: {
                                value: /^[a-zA-Z_]+$/,
                                message: "Only letters, and underscore (_) allowed",
                                },
                            })}
                            />
                            {errors.project_slug && (
                            <span className="text-danger">{errors.project_slug.message}</span>
                            )}
                        </div>
                    </Col>

                    <Col sm="4">
                        <div className="mb-3">
                            <Label>Username</Label>
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Enter username"
                                {...register("username", {
                                required: "Username is required",
                                minLength: {
                                    value: 4,
                                    message: "Username must be at least 4 characters",
                                },
                                })}
                            />
                            {errors.username && (
                                <span className="text-danger">{errors.username.message}</span>
                            )}
                        </div>
                    </Col>

                    <Col sm="4">
                        <div className="mb-3 position-relative">
                            <Label>Password</Label>

                            <input
                            type={showPassword ? "text" : "password"}
                            className="form-control pe-5"
                            placeholder="Enter password"
                            {...register("password", {
                                required: "Password is required",
                                minLength: {
                                value: 6,
                                message: "Password must be at least 6 characters",
                                },
                            })}
                            />

                            {/* 👁 Eye Icon */}
                            <span
                            onClick={() => setShowPassword(!showPassword)}
                            style={{
                                position: "absolute",
                                right: "15px",
                                top: "42px",
                                cursor: "pointer",
                            }}
                            >
                            <i className={`fa ${showPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
                            </span>

                            {errors.password && (
                            <span className="text-danger">{errors.password.message}</span>
                            )}
                        </div>
                    </Col>

                </Row>


                {/* Plan */}
                <Row>
                    <Col sm="4">
                    <div className="mb-3">
                        <Label>Plan</Label>
                        <select
                        className="form-control"
                        {...register("plan_id", { required: true })}
                        >
                        <option value="">Select Plan</option>
                        <option value="1">Basic</option>
                        <option value="2">Standard</option>
                        <option value="3">Premium</option>
                        </select>
                        {errors.plan_id && (
                        <span className="text-danger">Plan is required</span>
                        )}
                    </div>
                    </Col>
                </Row>

                {/* Start & End Date */}
                <Row>
                    <Col sm="4">
                    <div className="mb-3">
                        <Label>Start Date</Label>
                        <input
                        type="date"
                        className="form-control"
                        {...register("start_date", { required: true })}
                        />
                        {errors.start_date && (
                        <span className="text-danger">Start date is required</span>
                        )}
                    </div>
                    </Col>

                    <Col sm="4">
                    <div className="mb-3">
                        <Label>End Date</Label>
                        <input
                        type="date"
                        className="form-control"
                        {...register("end_date", { required: true })}
                        />
                        {errors.end_date && (
                        <span className="text-danger">End date is required</span>
                        )}
                    </div>
                    </Col>
                </Row>

                {/* Buttons */}
                <Row>
                    <Col className="text-end">
                    <Btn attrBtn={{ color: "success", className: "me-3" }}>
                        Save Tenant
                    </Btn>
                    <Btn attrBtn={{ color: "danger", type: "reset" }}>
                        Cancel
                    </Btn>
                    </Col>
                </Row>

            </Form>


// <Form className="theme-form" onSubmit={handleSubmit(AddProject)}>
            //     <Row>
            //         <MainTitle ProjectTitle={ProjectTitle} register={register} errors={errors} />
            //     </Row>
            //     <Row>
            //         <MainTitle register={register} errors={errors} ClientName={ClientName} />
            //     </Row>
            //     <Row>
            //         <Col sm="4">
            //             <MainType errors={errors} register={register} ProjectRate={ProjectRate} />
            //         </Col>
            //         <Col sm="4">
            //             <MainType ProjectType={ProjectType} register={register} />
            //         </Col>
            //         <MainPriority register={register} Priority={Priority} />
            //     </Row>
            //     <Row>
            //         <MainPriority register={register} ProjectSize={ProjectSize} />
            //         <Col sm="4">
            //             <MainDates StartingDate={StartingDate} />
            //         </Col>
            //         <Col sm="4">
            //             <MainDates EndingDate={EndingDate} />
            //         </Col>
            //     </Row>
            //     <Row>
            //         <Col>
            //             <div className="mb-3">
            //                 <Label>{EnterSomeDetails}</Label>
            //                 <input type="textarea" className="form-control" name="description" rows="3" style={{ height: '80px' }} {...register('description', { required: true })} />
            //                 <span style={{ color: 'red' }}>{errors.description && 'Some Details is required'}</span>
            //             </div>
            //         </Col>
            //     </Row>
            //     <DropItem />
            //     <Row>
            //         <Col className="text-end">
            //             <div className="mb-0">
            //                 <Btn attrBtn={{ color: 'success', className: 'me-3' }}>{Add}</Btn>
            //                 <Btn attrBtn={{ color: 'danger' }}>{Cancel}</Btn>
            //             </div>
            //         </Col>
            //     </Row>
            // </Form>
    );
};
export default MainList;