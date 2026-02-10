import TreeView, { flattenTree } from "react-accessible-treeview";
import { Card, CardBody, Col } from "reactstrap";
import HeadingCommon from "../../../Common/Component/HeadingCommon";
import { CheckboxTreeHeading } from "../../../Constant";
import { TreeViewData } from "../../../Data/Bonus-ui";
import { ArrowIcon, CheckBoxIcon } from "./BasicTree";

const CheckboxTree = () => {
  const disableTreeData = flattenTree(TreeViewData);
  return (
    <Col sm="6">
      <Card>
        <HeadingCommon CardHeaderClassName="pb-0" Heading={CheckboxTreeHeading} />
        <CardBody>
          <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
            <TreeView
              data={disableTreeData}
              aria-label="Checkbox tree"
              multiSelect
              propagateSelect
              propagateSelectUpwards
              defaultDisabledIds={[2, 3, 4, 5]}
              togglableSelect
              expandedIds={[1, 2, 6, 10]}
              nodeRenderer={({ element, isBranch, isExpanded, isSelected, isDisabled, isHalfSelected, getNodeProps, level, handleSelect, handleExpand }) => {
                return (
                  <div {...getNodeProps({ onClick: handleExpand })} style={{ marginLeft: 40 * (level - 1), opacity: isDisabled ? 0.5 : 1, marginTop: 5 }}>
                    {isBranch && <ArrowIcon isOpen={isExpanded} />}
                    <CheckBoxIcon
                      className="checkbox-icon "
                      onClick={(e) => {
                        handleSelect(e);
                        e.stopPropagation();
                      }}
                      variant={isHalfSelected ? "some" : isSelected ? "all" : "none"}
                    />
                    <span className="name">{element.name}</span>
                  </div>
                );
              }}
            />
          </div>
        </CardBody>
      </Card>
    </Col>
  );
};

export default CheckboxTree;
