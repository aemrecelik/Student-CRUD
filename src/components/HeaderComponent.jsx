import React from "react";
import { Menubar } from "primereact/menubar";

export default function HeaderComponent() {
  const items = [
    {
      label: "Student Managment",
    },
  ];

  return (
    <div>
      <Menubar model={items} />
    </div>
  );
}
