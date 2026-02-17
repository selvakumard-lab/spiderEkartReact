import React, { Fragment, useState,useEffect } from "react";
import DataTable from "react-data-table-component";
import { Breadcrumbs,H4 } from "../../AbstractElements";
import { Card,CardBody,CardHeader,Col,Container,Row,Button,Modal,ModalHeader,ModalBody,ModalFooter,Form,FormGroup,Label,Input } from "reactstrap";
import api from "../../Services/api";
import { toast } from "react-toastify";

const Category = () => {

    const BASE_URL = "http://localhost:5000";

    const [data, setData] = useState([]);

    const [editId, setEditId] = useState(null);



    useEffect(() => {
      fetchCategories();
    }, []);

    const fetchCategories = async () => {
      try {
        const response = await api.get("/category");

        if (response.data.success) {
          setData(response.data.data);
        }

      } catch (error) {
        console.error("Fetch error:", error.response?.data || error.message);
      }
    };

    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    const [formData, setFormData] = useState({
      name: "",
      subtitle: "",
      image: null,
    });

    const handleChange = (e) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    };


    const handleImageChange = (e) => {
      const file = e.target.files[0];

      if (file) {
        setFormData({
          ...formData,
          image: file,
        });
      }
    };



    const handleSubmit = async (e) => {
      e.preventDefault();

      const sendData = new FormData();
      sendData.append("name", formData.name);
      sendData.append("subtitle", formData.subtitle);

      if (formData.image) {
        sendData.append("image", formData.image);
      }

      try {

        let res;

        // 🔥 UPDATE
        if (editId) {
          res = await api.put(`/category/${editId}`, sendData, {
            transformRequest: [(data, headers) => {
              delete headers["Content-Type"];
              return data;
            }],
          });
        }
        // 🔥 ADD
        else {
          res = await api.post("/category", sendData, {
            transformRequest: [(data, headers) => {
              delete headers["Content-Type"];
              return data;
            }],
          });
        }

        toast.success(res.data.message);

        // reset
        setFormData({ name: "", subtitle: "", image: null });
        setEditId(null);
        toggle();

        fetchCategories();

      } catch (err) {
        toast.error(err.response?.data?.message || "Something went wrong");
      }
    };



    const handleEdit = (row) => {
      setEditId(row.id);

      setFormData({
        name: row.name,
        subtitle: row.subtitle,
        image: null,           // new image optional
        oldImage: row.image,   // keep old image
      });

      setModal(true);
    };


    const handleDelete = async (id) => {
      const confirmDelete = window.confirm("Are you sure you want to delete?");

      if (!confirmDelete) return;

      try {
        const response = await api.delete(`/category/${id}`);

        if(response.data.success){

          toast.success("Category deleted successfully");
        }


        fetchCategories();

      } catch (error) {
        console.error("Delete error:", error.response?.data || error.message);
      }
    };


    const columns = [
      {
        name: "S No",
        selector: (row) => row.id,
        sortable: true,
      },
      {
        name: "Category Name",
        selector: (row) => row.name,
        sortable: true,
      },
      {
        name: "Category Subtitle",
        selector: (row) => row.subtitle,
        sortable: true,
      },
      {
        name: "Category Image",
        cell: (row) => (
          <img
            src={
              row.image
                ? `${BASE_URL}/${row.image}`
                : "/assets/images/project/default.png"
            }
            alt="category"
            style={{
              width: "40px",
              height: "40px",
              objectFit: "cover",
              borderRadius: "10px",
            }}
          />
        ),
      },
      {
        name: "Action",
        cell: (row) => (
            <div className="d-flex gap-3 action-icons">

            {/* EDIT */}
            <i
                className="icon-pencil-alt text-primary cursor-pointer"
                title="Edit"
                onClick={() => handleEdit(row)}
            ></i>

            {/* DELETE */}
            <i
                className="icon-trash text-danger cursor-pointer"
                title="Delete"
                onClick={() => handleDelete(row.id)}
            ></i>

            </div>
        ),
       }
    ];

    return (
      <Fragment>
        <Breadcrumbs
          mainTitle="Category List"
          parent="Category"
          title="Category List"
        />

        <Container fluid>
          <Row>
            <Col sm="12">
              <Card>
                <CardHeader className="d-flex justify-content-between align-items-center">
                  <H4>Category List</H4>
                  <Button color="success" onClick={toggle}>
                    + Add Category
                  </Button>
                </CardHeader>
              
                <CardBody>
                  <div className="table-responsive theme-scrollbar product-table">
                    <DataTable
                      pagination
                      paginationPerPage={7}
                      highlightOnHover
                      striped
                      columns={columns}
                      data={data}
                    />
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>

        {/* ✅ Modal */}
        <Modal isOpen={modal} toggle={toggle}>
          <ModalHeader toggle={toggle}>
          {editId ? "Update Category" : "Add Category"}
          </ModalHeader>

          <Form onSubmit={handleSubmit}>
            <ModalBody>

              <FormGroup>
                <Label>Category Name</Label>
                <Input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter category name"
                />
              </FormGroup>

              <FormGroup>
                <Label>Category Subtitle</Label>
                <Input
                  type="text"
                  name="subtitle"
                  value={formData.subtitle}
                  onChange={handleChange}
                  placeholder="Enter subtitle"
                />
              </FormGroup>

              <FormGroup>
                <Label>
                  Category Image <br />
                  <small>
                    *Please choose square image larger than 350px × 350px and
                    smaller than 550px × 550px.*
                  </small>
                </Label>
                <Input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleImageChange}
                />

                {editId && formData.oldImage && (
                  <div className="mt-2">
                    <p>Current Image:</p>
                    <img
                      src={`${BASE_URL}/${formData.oldImage}`}
                      width="80"
                      style={{ borderRadius: "8px" }}
                      alt=""
                    />
                  </div>
                )}


              </FormGroup>

            </ModalBody>

            <ModalFooter>
              <Button color="primary" type="submit">
                {editId ? "Update" : "Save"}
              </Button>

              <Button color="secondary" onClick={toggle}>
                Cancel
              </Button>
            </ModalFooter>
          </Form>
        </Modal>
      </Fragment>
    );
};

export default Category;
