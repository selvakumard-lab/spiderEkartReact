import React, { Fragment, useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { Card, CardBody, CardHeader, Col, Container, Row, Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from "reactstrap";
import api from "../../Services/api";
import { toast } from "react-toastify";

const FeaturedSection = () => {

  const [data,setData]=useState([]);
  const [modal,setModal]=useState(false);
  const [editId,setEditId]=useState(null);

  const [formData,setFormData]=useState({
    title:"",
    short_description:"",
    placed_in:"top",
    section_style:"style1",
    product_ids:""
  });

  const toggle=()=>setModal(!modal);

  useEffect(()=>{ fetchData(); },[]);

  const fetchData=async()=>{
    const res=await api.get("/featuredsection");
    setData(res.data.data || []);
  };

  const handleChange=e=>{
    setFormData({...formData,[e.target.name]:e.target.value});
  };

  const handleSubmit=async e=>{
    e.preventDefault();

    if(editId)
      await api.put(`/featuredsection/${editId}`,formData);
    else
      await api.post("/featuredsection",formData);

    toast.success("Saved successfully");
    setEditId(null);
    toggle();
    fetchData();
  };

  const handleEdit=row=>{
    setEditId(row.id);
    setFormData(row);
    setModal(true);
  };

  const handleDelete=async id=>{
    if(!window.confirm("Delete?"))return;
    await api.delete(`/featuredsection/${id}`);
    fetchData();
  };

  const columns=[
    { name:"ID",selector:r=>r.id,width:"70px"},
    { name:"Title",selector:r=>r.title},
    { name:"Placed In",selector:r=>r.placed_in},
    { name:"Style",selector:r=>r.section_style},
    { name:"Products",selector:r=>r.product_ids},
    {
      name:"Action",
      cell:r=>(
        <div className="d-flex gap-2">
          <i className="icon-pencil-alt text-primary" onClick={()=>handleEdit(r)}></i>
          <i className="icon-trash text-danger" onClick={()=>handleDelete(r.id)}></i>
        </div>
      )
    }
  ];

  return (
    <Fragment>
      <Container fluid>
        <Row>
          <Col sm="12">
            <Card>
              <CardHeader className="d-flex justify-content-between">
                <h4>Featured Sections</h4>
                <Button color="success" onClick={toggle}>+ Add</Button>
              </CardHeader>
              <CardBody>
                <div className="table-responsive theme-scrollbar product-table">
                  <DataTable columns={columns} data={data} pagination/>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>

      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>{editId?"Edit":"Add"} Featured Section</ModalHeader>
        <Form onSubmit={handleSubmit}>
          <ModalBody>

            <FormGroup>
              <Label>Title</Label>
              <Input name="title" value={formData.title} onChange={handleChange} required/>
            </FormGroup>

            <FormGroup>
              <Label>Short Description</Label>
              <Input name="short_description" value={formData.short_description} onChange={handleChange}/>
            </FormGroup>

            <FormGroup>
              <Label>Placed In</Label>
              <Input type="select" name="placed_in" value={formData.placed_in} onChange={handleChange}>
                <option value="top">Top</option>
                <option value="bottom">Bottom</option>
              </Input>
            </FormGroup>

            <FormGroup>
              <Label>Section Style</Label>
              <Input type="select" name="section_style" value={formData.section_style} onChange={handleChange}>
                <option value="style1">Style 1</option>
                <option value="style2">Style 2</option>
                <option value="style3">Style 3</option>
              </Input>
            </FormGroup>

            <FormGroup>
              <Label>Product IDs (comma separated)</Label>
              <Input name="product_ids" value={formData.product_ids} onChange={handleChange}/>
            </FormGroup>

          </ModalBody>
          <ModalFooter>
            <Button color="primary">Save</Button>
          </ModalFooter>
        </Form>
      </Modal>
    </Fragment>
  );
};

export default FeaturedSection;