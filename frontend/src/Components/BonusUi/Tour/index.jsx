import { TourGuideClient } from "@sjmc11/tourguidejs";
import React, { Fragment, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { Breadcrumbs } from "../../../AbstractElements";
import TourMain from "./TourMain";

const steps = [
  {
    target: ".step1",
    content: "This is Profile image",
  },
  {
    target: ".step2",
    content: "Change Profile image here",
  },
  {
    target: ".step3",
    content: "This is your Social details",
  },
  {
    target: ".step4",
    content: "This is your Your detail",
  },
  {
    target: ".step5",
    content: "This is the your first Post",
  },
  {
    target: ".step6",
    content: "This is the your Last Post",
  },
];

const ToursContain = () => {
  const tourRef = useRef(null);
  const [isTourOpen, setIsTourOpen] = useState(false);

  useEffect(() => {
    try {
      tourRef.current = new TourGuideClient({ steps: steps });
    } catch (error) {
      toast.error("Error initializing TourGuideClient:" + error);
    }

    return () => tourRef.current?.destroy?.();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setIsTourOpen(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isTourOpen) tourRef.current?.start?.();
  }, [isTourOpen]);

  return (
    <Fragment>
      <Breadcrumbs mainTitle="Tour" parent="Bonus UI" title="Tour" />
      <TourMain />
    </Fragment>
  );
};

export default ToursContain;
