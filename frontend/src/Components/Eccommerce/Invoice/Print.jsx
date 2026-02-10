import { Fragment, useRef } from "react";
import { Link } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import { Breadcrumbs, Btn } from "../../../AbstractElements";
import { Cancel, Print } from "../../../Constant";
import ItemDescription from "./ItemDescription";

const PrintComponent = () => {
  const contentRef = useRef();
  const handlePrint = useReactToPrint({ contentRef });
  return (
    <Fragment>
      <Breadcrumbs mainTitle="Invoice" parent="Ecommerce" title="Invoice" />
      <div ref={contentRef}>
        <ItemDescription />
      </div>
      <div className="text-center mb-4">
        <Btn attrBtn={{ color: "primary", className: "me-2", onClick: () => handlePrint() }}>{Print}</Btn>
        <Link to={`${process.env.PUBLIC_URL}/ecommerce/product`}>
          <Btn attrBtn={{ color: "secondary" }}>{Cancel}</Btn>
        </Link>
      </div>
    </Fragment>
  );
};

export default PrintComponent;
