import { useRef } from "react";
import { Printer } from "react-feather";
import { useReactToPrint } from "react-to-print";
import { Card, CardHeader } from "reactstrap";
import { H5 } from "../../AbstractElements";
import { CreatedByMe, Href, Print } from "../../Constant";
import CreatedByme from "./CreatedByme";

const ListOfTask = () => {
  const contentRef = useRef();

  const handlePrint = useReactToPrint({
    contentRef,
  });

  return (
    <Card className="mb-0">
      <CardHeader>
        <H5 attrH5={{ className: "mb-0" }}>{CreatedByMe}</H5>
        <a href={Href} className="f-w-600" onClick={handlePrint}>
          <Printer className="me-2" />
          {Print}
        </a>
      </CardHeader>
      <div ref={contentRef}>
        <CreatedByme />
      </div>
    </Card>
  );
};

export default ListOfTask;
