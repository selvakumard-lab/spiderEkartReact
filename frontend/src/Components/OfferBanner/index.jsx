import React, { Fragment, useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { Breadcrumbs, H4 } from "../../AbstractElements";
import {
  Card, CardBody, CardHeader, Col, Container, Row,
  Button, Form, FormGroup, Label, Input
} from "reactstrap";
import api from "../../Services/api";
import { toast } from "react-toastify";

const OfferBanner = () => {

  const BASE_URL = "http://localhost:5000";

  const [data, setData] = useState([]);
  const [editId, setEditId] = useState(null);

  const [formData, setFormData] = useState({
    image: null,
    oldImage: null,
  });

  /* ---------------- FETCH ---------------- */
  useEffect(() => {
    fetchBanner();
  }, []);

  const fetchBanner = async () => {
    try {
      const res = await api.get("/offerbanner");
      setData(res.data.data || []);
    } catch (err) {
      toast.error("Failed to load banners");
    }
  };

  /* ---------------- IMAGE CHANGE ---------------- */
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFormData({
      ...formData,
      image: file,
    });
  };

  /* ---------------- SUBMIT ---------------- */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.image && !editId) {
      toast.error("Please select image");
      return;
    }

    const sendData = new FormData();
    if (formData.image) sendData.append("image", formData.image);

    try {
      let res;

      if (editId) {
        res = await api.put(`/offerbanner/${editId}`, sendData, {
          transformRequest: [(data, headers) => {
            delete headers["Content-Type"];
            return data;
          }],
        });
      } else {
        res = await api.post("/offerbanner", sendData, {
          transformRequest: [(data, headers) => {
            delete headers["Content-Type"];
            return data;
          }],
        });
      }

      toast.success(res.data.message);
      fetchBanner();
      resetForm();

    } catch (err) {
      toast.error(err.response?.data?.message || "Upload failed");
    }
  };

  /* ---------------- RESET ---------------- */
  const resetForm = () => {
    setFormData({ image: null, oldImage: null });
    setEditId(null);
  };

  /* ---------------- EDIT ---------------- */
  const handleEdit = (row) => {
    setEditId(row.id);
    setFormData({
      image: null,
      oldImage: row.image,
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  /* ---------------- DELETE ---------------- */
  const handleDelete = async (id) => {
    if (!window.confirm("Delete banner?")) return;

    try {
      await api.delete(`/offerbanner/${id}`);
      toast.success("Banner deleted");
      fetchBanner();
    } catch {
      toast.error("Delete failed");
    }
  };

  /* ---------------- TABLE ---------------- */
  const columns = [
    { name: "ID", selector: r => r.id, width: "80px" },

    {
      name: "Image",
      cell: r => (
        <img
          src={`${BASE_URL}/${r.image}`}
          width="90"
          height="40"
          alt="offer banner"
          style={{ objectFit: "cover", borderRadius: 8 }}
        />
      )
    },

    {
      name: "Action",
      cell: (r) => (
        <div className="d-flex gap-3 action-icons">

          <i
            className="icon-pencil-alt text-primary cursor-pointer"
            title="Edit"
            onClick={() => handleEdit(r)}
          ></i>

          <i
            className="icon-trash text-danger cursor-pointer"
            title="Delete"
            onClick={() => handleDelete(r.id)}
          ></i>

        </div>
      ),
    }
  ];

  /* ---------------- UI ---------------- */
  return (
    <Fragment>
      <Breadcrumbs mainTitle="Offer Banner" parent="Offer" title="Offer Banner" />

      <Container fluid>
        <Row>

          {/* FORM */}
          <Col sm="6">
            <Card>
              <CardHeader>
                <H4>{editId ? "Update Offer Banner" : "Add Offer Banner"}</H4>
              </CardHeader>

              <CardBody>
                <Form onSubmit={handleSubmit}>

                  <FormGroup>
                    <Label>
                      Upload Banner Image <br />
                      <small>Recommended Size : 1024 × 512 pixels</small>
                    </Label>

                    <Input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                    />

                    {/* Preview */}
                    {editId && formData.oldImage && (
                      <div className="mt-3">
                        <p className="mb-1">Current Image:</p>
                        <img
                          src={`${BASE_URL}/${formData.oldImage}`}
                          width="160"
                          alt="current banner"
                          style={{ borderRadius: 10 }}
                        />
                      </div>
                    )}

                  </FormGroup>

                  <div className="d-flex gap-2">
                    <Button color="primary">
                      {editId ? "Update" : "Save"}
                    </Button>

                    {editId && (
                      <Button color="secondary" type="button" onClick={resetForm}>
                        Cancel
                      </Button>
                    )}
                  </div>

                </Form>
              </CardBody>
            </Card>
          </Col>

          {/* TABLE */}
          <Col sm="6">
            <Card>
              <CardHeader>
                <H4>Offer Banner List</H4>
              </CardHeader>

              <CardBody>
                <div className="table-responsive theme-scrollbar product-table">
                <DataTable
                  columns={columns}
                  data={data}
                  pagination
                  highlightOnHover
                  striped
                />
                </div>
              </CardBody>
            </Card>
          </Col>

        </Row>
      </Container>
    </Fragment>
  );
};

export default OfferBanner;