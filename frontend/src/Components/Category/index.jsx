import React, { Fragment, useState } from "react";
import DataTable from "react-data-table-component";
import {
  Breadcrumbs,
  H4,
} from "../../AbstractElements";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Row,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";

import api from "../../Services/api";

const Category = () => {

  const [data, setData] = useState([
    { id: 1, name: "Electronics", subtitle: "Latest Gadgets", image: "https://via.placeholder.com/400" },
    { id: 2, name: "Fashion", subtitle: "Trending Styles", image: "https://via.placeholder.com/420" },
  ]);

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const [formData, setFormData] = useState({
    name: "",
    subtitle: "",
    image: "",
  });

  // ✅ Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Handle Image Upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setFormData({ ...formData, image: imageURL });
    }
  };

  // ✅ Add Category
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();


    formDataToSend.append("name", data.company_name);
    formDataToSend.append("subtitle", data.client_name);
          
    formDataToSend.append("image", data.project_image[0]);

    console.log("sssssssssssssss",formDataToSend);

    try {

      const response = await api.post("/tenants", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // const response = await fetch("http://localhost:5000/api/category/add", {
      //   method: "POST",
      //   body: formDataToSend,
      // });

      const result = await response.json();
      alert(result.message);
      toggle();

    } catch (error) {
      console.error(error);
    }
  };


  // ✅ Edit Function
  const handleEdit = (row) => {
    console.log("Edit clicked:", row);
    alert(`Edit Category: ${row.name}`);
  };

  // ✅ Delete
  const handleDelete = (id) => {
    if (window.confirm("Are you sure?")) {
      setData(data.filter((item) => item.id !== id));
    }
  };

  const columns = [
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
          src={row.image}
          alt="category"
          style={{
            width: "60px",
            height: "60px",
            objectFit: "cover",
            borderRadius: "8px",
          }}
        />
      ),
    },
    {
      name: "Action",
      cell: (row) => (
        <div className="d-flex gap-2">
          <Button
            color="primary"
            size="sm"
            onClick={() => handleEdit(row)}
          >
            Edit
          </Button>
          <Button
            color="danger"
            size="sm"
            onClick={() => handleDelete(row.id)}
          >
            Delete
          </Button>
        </div>
      ),
    },
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
                <div className="table-responsive theme-scrollbar">
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
        <ModalHeader toggle={toggle}>Add Category</ModalHeader>
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
                accept="image/*"
                onChange={handleImageChange}
              />
            </FormGroup>

          </ModalBody>

          <ModalFooter>
            <Button color="primary" type="submit">
              Save
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
