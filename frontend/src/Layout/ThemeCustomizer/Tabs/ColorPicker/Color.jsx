import React, { useContext, Fragment, useState, useEffect } from "react";
import { Input } from "reactstrap";
import { Btn, H6, UL } from "../../../../AbstractElements";
import ConfigDB from "../../../../Config/ThemeConfig";
import { Apply, UnlimitedColor } from "../../../../Constant";
import CustomizerContext from "../../../../Helper/Customizer/index";

const ColorsComponent = () => {
  const { addColor } = useContext(CustomizerContext);

  const default_color =
    localStorage.getItem("default_color") || ConfigDB.color.primary_color;
  const secondary_color =
    localStorage.getItem("secondary_color") ||
    ConfigDB.color.secondary_color;
  const [colorBackground1, setColorBackground1] = useState(default_color);
  const [colorBackground2, setColorBackground2] = useState(secondary_color);

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--theme-default",
      colorBackground1
    );
    document.documentElement.style.setProperty(
      "--theme-secondary",
      colorBackground2
    );
  }, [colorBackground1, colorBackground2]);

  const handleUnlimitedColor1Change = (e) => {
    const { value } = e.target;
    setColorBackground1(value);
  };

  const handleUnlimitedColor2Change = (e) => {
    const { value } = e.target;
    setColorBackground2(value);
  };

  const onUnlimitedColorClick = () => {
    addColor(colorBackground1, colorBackground2);

    document.documentElement.style.setProperty(
      "--theme-default",
      colorBackground1
    );
    document.documentElement.style.setProperty(
      "--theme-secondary",
      colorBackground2
    );
  };

  return (
    <Fragment>
      <H6>{UnlimitedColor}</H6>
      <UL
        attrUL={{
          className: "simple-list flex-row layout-grid unlimited-color-layout",
        }}
      >
        <Input
          type="color"
          name="Color-Background1"
          value={colorBackground1}
          onChange={handleUnlimitedColor1Change}
        />
        <Input
          type="color"
          name="Color-Background2"
          value={colorBackground2}
          onChange={handleUnlimitedColor2Change}
        />
        <Btn
          attrBtn={{
            color: "primary",
            className: "color-apply-btn",
            onClick: onUnlimitedColorClick,
          }}
        >
          {Apply}
        </Btn>
      </UL>
    </Fragment>
  );
};

export default ColorsComponent;
