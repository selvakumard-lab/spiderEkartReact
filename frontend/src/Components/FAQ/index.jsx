import React, { Fragment, useState, useEffect } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Row,
  Button,
  Input,
  Form,
  FormGroup
} from "reactstrap";
import { Breadcrumbs, H4 } from "../../AbstractElements";
import { Plus, Minus } from "react-feather";
import api from "../../Services/api";
import { toast } from "react-toastify";

const FAQContent = () => {

  const [faqList, setFaqList] = useState([
    { question: "", answer: "" }
  ]);

  // =========================
  // GET FAQ FROM DATABASE
  // =========================

  const getFaq = async () => {

    try {

      const res = await api.get("/faq/list");

      if (res.data.data.length > 0) {
        setFaqList(res.data.data);
      }

    } catch (error) {

      console.log(error);

    }

  };

  useEffect(() => {
    getFaq();
  }, []);

  // =========================
  // ADD ROW
  // =========================

  const addRow = () => {
    setFaqList([...faqList, { question: "", answer: "" }]);
  };

  // =========================
  // REMOVE ROW
  // =========================

  const removeRow = (index) => {

    const list = [...faqList];
    list.splice(index, 1);

    setFaqList(list);

  };

  // =========================
  // INPUT CHANGE
  // =========================

  const handleChange = (e, index) => {

    const { name, value } = e.target;

    const list = [...faqList];

    list[index][name] = value;

    setFaqList(list);

  };

  // =========================
  // STORE FAQ
  // =========================

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await api.post("/faq/store", {
        faq: faqList
      });

      toast.success("FAQ Updated Successfully");

      getFaq();

    } catch (error) {

      toast.error("Something went wrong");

    }

  };

  return (

    <Fragment>

      <Breadcrumbs mainTitle="FAQ" parent="Apps" title="FAQ" />

      <Container fluid={true}>
        <Row>
          <Col sm="12">

            <Card>

              <CardHeader>
                <H4>FAQ Management</H4>
              </CardHeader>

              <CardBody>

                <Form onSubmit={handleSubmit}>

                  {faqList.map((item, index) => (

                    <Row key={index} className="mb-3">

                      <Col md="5">

                        <FormGroup>

                          <label>Question</label>

                          <Input
                            type="text"
                            name="question"
                            value={item.question}
                            onChange={(e) => handleChange(e, index)}
                            placeholder="Enter Question"
                          />

                        </FormGroup>

                      </Col>

                      <Col md="5">

                        <FormGroup>

                          <label>Answer</label>

                          <Input
                            type="textarea"
                            name="answer"
                            value={item.answer}
                            onChange={(e) => handleChange(e, index)}
                            placeholder="Enter Answer"
                          />

                        </FormGroup>

                      </Col>

                      <Col md="2" className="d-flex align-items-center">

                        <Button
                          color="success"
                          type="button"
                          onClick={addRow}
                          className="me-2"
                        >
                          <Plus size={16} />
                        </Button>

                        {faqList.length !== 1 && (

                          <Button
                            color="danger"
                            type="button"
                            onClick={() => removeRow(index)}
                          >
                            <Minus size={16} />
                          </Button>

                        )}

                      </Col>

                    </Row>

                  ))}

                  <Button color="primary" type="submit">
                    Update FAQ
                  </Button>

                </Form>

              </CardBody>

            </Card>

          </Col>
        </Row>
      </Container>

    </Fragment>

  );
};

export default FAQContent;