import React, { Fragment, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
} from "reactstrap";
import { Breadcrumbs } from "../../AbstractElements";
import api from "../../Services/api";
import { Controller } from "react-hook-form";
import { toast } from "react-toastify";

const AddProduct = () => {
  const { control, handleSubmit, watch } = useForm();
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [brands, setBrands] = useState([]);

  const [variations, setVariations] = useState([]);

  const [mainImage, setMainImage] = useState(null);
  const [otherImages, setOtherImages] = useState([]);

  const [mainPreview, setMainPreview] = useState(null);
  const [otherPreview, setOtherPreview] = useState([]);

  const sgst = watch("sgst") || 0;
  const cgst = watch("cgst") || 0;
  const igst = watch("igst") || 0;

  useEffect(() => {
    getCategories();
    getBrands();
  }, []);

  const getCategories = async () => {
    const res = await api.get("/category");

    setCategories(res.data.data);
  };

  const getBrands = async () => {
    const res = await api.get("/brand");
    setBrands(res.data.data);
  };

  const getSubCategories = async (id) => {
    const res = await api.get(`/subcategory/${id}`);
    setSubCategories(res.data.data);
  };

  /* ---------------- VARIATION ADD ---------------- */

  const addVariation = () => {
    setVariations([
      ...variations,
      {
        measurement: "",
        unit: "kg",
        weight: "",
        mrp: "",
        selling_price: "",
        product_price: "",
        stock: "",
        status: "Available",
      },
    ]);
  };

  /* ---------------- REMOVE VARIATION ---------------- */

  const removeVariation = (index) => {
    const data = [...variations];
    data.splice(index, 1);
    setVariations(data);
  };

  /* ---------------- CHANGE VARIATION ---------------- */

  const handleChangeVariation = (index, field, value) => {
    const data = [...variations];
    data[index][field] = value;

    /* AUTO GST CALCULATION */

    if (field === "selling_price") {
      const price = parseFloat(value) || 0;
      const gst = parseFloat(sgst) + parseFloat(cgst) + parseFloat(igst);

      const finalPrice = price + (price * gst) / 100;

      data[index].product_price = finalPrice.toFixed(2);
    }

    setVariations(data);
  };

  /* ---------------- IMAGE PREVIEW ---------------- */

  const handleMainImage = (e) => {
    const file = e.target.files[0];

    setMainImage(file);

    if (file) {
      setMainPreview(URL.createObjectURL(file));
    }
  };

  const handleOtherImages = (e) => {
    const files = Array.from(e.target.files);

    setOtherImages(files);

    const preview = files.map((file) => URL.createObjectURL(file));
    setOtherPreview(preview);
  };

  /* ---------------- SUBMIT ---------------- */

  const onSubmit = async (data) => {

    const formData = new FormData();

    Object.keys(data).forEach((key) => {
      if (data[key] !== undefined && data[key] !== null) {
        formData.append(key, data[key]);
      }
    });

    formData.append("variations", JSON.stringify(variations));

    if (mainImage) {
      formData.append("main_image", mainImage);
    }

    otherImages.forEach((img) => {
      formData.append("other_images", img);
    });

    /* PRINT DATA IN CONSOLE */
    for (let pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }

    try {
      const res = await api.post("/product/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success(res.data.message);

    } catch (error) {
      

      toast.error(error.response?.data?.message || "failed");
    }
  };

  return (
    <Fragment>
      <Breadcrumbs
        parent="Ecommerce"
        title="Add Product"
        mainTitle="Add Product"
      />

      <Container fluid>
        <Form onSubmit={handleSubmit(onSubmit)}>
          {/* BASIC DETAILS */}

          <Row>
            <Col lg="6">
              <Card>
                <CardBody>
                  <FormGroup>
                    <Label>Product Name</Label>
                    <Controller
                      name="product_name"
                      control={control}
                      defaultValue=""
                      render={({ field }) => <Input {...field} />}
                    />
                  </FormGroup>

                  <Row>
                    <Col md="6">
                      <Label>Price Type</Label>
                      <Controller
                        name="price_type"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                          <Input type="select" {...field}>
                            <option value="">Select</option>
                            <option value="Including GST">Including GST</option>
                            <option value="Excluding GST">Excluding GST</option>
                          </Input>
                        )}
                      />
                    </Col>

                    <Col md="6">
                      <Label>HSN/SAC</Label>
                      <Controller
                        name="hsn"
                        control={control}
                        defaultValue=""
                        render={({ field }) => <Input {...field} />}
                      />
                    </Col>
                  </Row>

                  <Label className="mt-3">GST (%)</Label>

                  <Row>

                    <Col>
                        <Controller
                        name="sgst"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                            <Input placeholder="SGST" {...field} />
                        )}
                        />
                    </Col>
                    <Col>
                        <Controller
                        name="cgst"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                            <Input placeholder="CGST" {...field} />
                        )}
                        />
                    </Col>


                    <Col>
                        <Controller
                        name="igst"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                            <Input placeholder="IGST" {...field} />
                        )}
                        />
                    </Col>
                  </Row>

                  <FormGroup className="mt-3">
                    <Label>Type</Label>

                    <Controller
                        name="type"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                        <>
                            <Input
                            type="radio"
                            value="packet"
                            checked={field.value === "packet"}
                            onChange={field.onChange}
                            />{" "}
                            Packet

                            {"  "}

                            <Input
                            type="radio"
                            value="loose"
                            checked={field.value === "loose"}
                            onChange={field.onChange}
                            />{" "}
                            Loose
                        </>
                        )}
                    />
                    </FormGroup>
                </CardBody>
              </Card>
            </Col>

            {/* IMAGE SECTION */}

            <Col lg="6">
              <Card>
                <CardBody>
                  <Label>Main Image</Label>

                  <Input type="file" onChange={handleMainImage} />

                  <Row>
                    {mainPreview && (
                      <img
                        src={mainPreview}
                        alt=""
                        style={{ width: "120px", marginTop: "10px" }}
                      />
                    )}
                  </Row>

                  <Label className="mt-3">Other Images</Label>

                  <Input type="file" multiple onChange={handleOtherImages} />

                  <Row>
                    {otherPreview.map((img, i) => (
                      <Col md="3" key={i}>
                        <img
                          src={img}
                          alt=""
                          style={{ width: "100%", marginTop: "10px" }}
                        />
                      </Col>
                    ))}
                  </Row>

                  <FormGroup className="mt-3">
                    <Label>Description</Label>
                    <Controller
                      name="description"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <Input type="textarea" {...field} />
                      )}
                    />
                  </FormGroup>
                </CardBody>
              </Card>
            </Col>
          </Row>

          {/* VARIATIONS */}

          <Card className="mt-4">
            <CardBody>
              <div className="d-flex justify-content-between">
                <Label>Product Measurement</Label>

                <Button color="primary" type="button" onClick={addVariation}>
                  + Add Variation
                </Button>
              </div>

              <Row className="mt-3">
                <Col>Measurement</Col>
                <Col>Unit</Col>
                <Col>Weight</Col>
                <Col>MRP</Col>
                <Col>Selling Price</Col>
                <Col>Product Price</Col>
                <Col>GSTs</Col>
                <Col>Stock</Col>
                <Col>Status</Col>
                <Col></Col>
              </Row>

              {variations.map((v, index) => (
                <Row key={index} className="mt-2">
                  <Col>
                    <Input
                      onChange={(e) =>
                        handleChangeVariation(
                          index,
                          "measurement",
                          e.target.value,
                        )
                      }
                    />
                  </Col>

                  <Col>
                    <Input
                      type="select"
                      onChange={(e) =>
                        handleChangeVariation(index, "unit", e.target.value)
                      }
                    >
                      <option>kg</option>
                      <option>pc</option>
                      <option>gm</option>
                      <option>ltr</option>
                      <option>ml</option>
                      <option>pack</option>
                      <option>m</option>
                      <option>pair</option>
                    </Input>
                  </Col>

                  <Col>
                    <Input
                      onChange={(e) =>
                        handleChangeVariation(index, "weight", e.target.value)
                      }
                    />
                  </Col>

                  <Col>
                    <Input
                      onChange={(e) =>
                        handleChangeVariation(index, "mrp", e.target.value)
                      }
                    />
                  </Col>

                  <Col>
                    <Input
                      onChange={(e) =>
                        handleChangeVariation(
                          index,
                          "selling_price",
                          e.target.value,
                        )
                      }
                    />
                  </Col>

                  <Col>
                    <Input value={v.product_price} readOnly />
                  </Col>

                  <Col>
                    <Input placeholder="SGST" value={sgst} readOnly />
                    <Input placeholder="CGST" value={cgst} readOnly />
                    <Input placeholder="IGST" value={igst} readOnly />
                  </Col>

                  <Col>
                    <Input
                      onChange={(e) =>
                        handleChangeVariation(index, "stock", e.target.value)
                      }
                    />
                  </Col>

                  <Col>
                    <Input
                      type="select"
                      onChange={(e) =>
                        handleChangeVariation(index, "status", e.target.value)
                      }
                    >
                      <option>Available</option>
                      <option>Sold Out</option>
                    </Input>
                  </Col>

                  <Col>
                    <Button
                      color="danger"
                      size="sm"
                      onClick={() => removeVariation(index)}
                    >
                      Remove
                    </Button>
                  </Col>
                </Row>
              ))}
            </CardBody>
          </Card>

          {/* CATEGORY */}

          <Card className="mt-4">
            <CardBody>
              <Row>
                <Col md="4">
                  <Label>Category</Label>

                  <Controller
                    name="category"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <Input
                        type="select"
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                          getSubCategories(e.target.value);
                        }}
                      >
                        <option value="">Select Category</option>
                        {categories.map((cat) => (
                          <option key={cat.id} value={cat.id}>
                            {cat.name}
                          </option>
                        ))}
                      </Input>
                    )}
                  />
                </Col>

                <Col md="4">
                  <Label>Sub Category</Label>

                  <Controller
                    name="sub_category"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <Input type="select" {...field}>
                        <option value="">Select Sub Category</option>
                        {subCategories.map((sub) => (
                          <option key={sub.id} value={sub.id}>
                            {sub.name}
                          </option>
                        ))}
                      </Input>
                    )}
                  />
                </Col>

                <Col md="4">
                  <Label>Brand</Label>

                  <Controller
                    name="brand"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <Input type="select" {...field}>
                        <option value="">Select Brand</option>
                        {brands.map((brand) => (
                          <option key={brand.id} value={brand.id}>
                            {brand.name}
                          </option>
                        ))}
                      </Input>
                    )}
                  />
                </Col>
              </Row>
            </CardBody>
          </Card>

          {/* STOCK */}

          <Card className="mt-4">
            <CardBody>
              <Row>
                <Col md="6">
                  <Label>Minimum Stock</Label>
                  <Controller
                    name="minimum_stock"
                    control={control}
                    defaultValue=""
                    render={({ field }) => <Input type="number" {...field} />}
                  />
                </Col>

                <Col md="6">
                  <Label>Status</Label>
                  <Controller
                    name="status"
                    control={control}
                    defaultValue="Enabled"
                    render={({ field }) => (
                      <Input type="select" {...field}>
                        <option value="Enabled">Enabled</option>
                        <option value="Disabled">Disabled</option>
                      </Input>
                    )}
                  />
                </Col>
              </Row>
            </CardBody>
          </Card>

          <div className="text-end mt-4">
            <Button color="primary" type="submit">
              Save Product
            </Button>{" "}
            <Button color="danger" onClick={() => navigate(-1)}>
              Cancel
            </Button>
          </div>
        </Form>
      </Container>
    </Fragment>
  );
};

export default AddProduct;
