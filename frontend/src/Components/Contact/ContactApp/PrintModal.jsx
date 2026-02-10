import React, { Fragment, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import { Btn } from "../../../AbstractElements";
import { Cancel, Print, PrintViews } from "../../../Constant";
import PrintPreview from "../printpreview";

const PrintModal = ({ printmodal, selectedUser, toggleCallback }) => {
  const printModalToggle = () => {
    toggleCallback(false);
  };

  const contentRef = useRef();
  const handlePrint = useReactToPrint({ contentRef });
  return (
    <Fragment>
      <Modal isOpen={printmodal} toggle={printModalToggle}>
        <ModalHeader>
          {PrintViews}
          <Btn attrBtn={{ color: "transprant", className: "btn-close", onClick: printModalToggle, type: "button" }}></Btn>
        </ModalHeader>
        <ModalBody className="list-persons">
          <div ref={contentRef}>
            <PrintPreview selectedUser={selectedUser} ref={contentRef} />
          </div>
          <Btn attrBtn={{ color: "secondary", className: "me-1", onClick: () => handlePrint() }}>{Print}</Btn>
          &nbsp;&nbsp;
          <Btn attrBtn={{ color: "primary", onClick: printModalToggle }}>{Cancel}</Btn>
        </ModalBody>
      </Modal>
    </Fragment>
  );
};

export default PrintModal;
