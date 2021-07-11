import "./DataTable.css";

import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";
import { InputMask } from "primereact/inputmask";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Toast } from "primereact/toast";
import { Toolbar } from "primereact/toolbar";
import { classNames } from "primereact/utils";
import React, { useEffect, useRef, useState } from "react";
import { FileUpload } from "primereact/fileupload";
import StudentService from "../services/StudentService";
import CityService from "../services/CityService";
import DistrictService from "../services/DistrictService";

export default function ListStudentsComponent() {
  let emptyStudent = {
    id: null,
    name: "",
    surname: "",
    mobilePhoneNumber: "",
    city: "",
    district: "",
    description: "",
  };

  const [viewStudentDialog, setViewStudentDialog] = useState(false);
  const [students, setStudents] = useState(null);
  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [district, setDistrict] = useState([]);
  const [studentDialog, setStudentDialog] = useState(false);
  const [deleteStudentDialog, setDeleteStudentDialog] = useState(false);
  const [student, setStudent] = useState(emptyStudent);
  const [submitted, setSubmitted] = useState(false);
  const [globalFilter, setGlobalFilter] = useState(null);
  const toast = useRef(null);
  const dt = useRef(null);
  const studentService = new StudentService();
  const cityService = new CityService();
  const districtService = new DistrictService();
  const citySelectItems = cities.map((e) => e.name);
  useEffect(() => {
    studentService.getAllStudents().then((data) => setStudents(data.data));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => {
    cityService.getAllCities().then((data) => setCities(data.data));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => {
    districtService.getAllDistricts().then((data) => setDistricts(data.data));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const openNew = () => {
    setStudent(emptyStudent);
    setSubmitted(false);
    setStudentDialog(true);
  };

  const hideDialog = () => {
    setSubmitted(false);
    setStudentDialog(false);
  };
  const hideViewStudentDialog = () => {
    setViewStudentDialog(false);
  };

  const hideDeleteStudentDialog = () => {
    setDeleteStudentDialog(false);
  };

  const saveStudent = () => {
    setSubmitted(true);

    if (
      student.name.trim() &&
      student.surname.trim() &&
      student.mobilePhoneNumber.trim() &&
      student.city &&
      student.district
    ) {
      let _students = [...students];
      let _student = { ...student };
      console.log(_student);
      if (student.id) {
        const index = findIndexById(student.id);

        _students[index] = _student;
        studentService.updateStudent(student.id, _student);
        toast.current.show({
          severity: "success",
          summary: "Successful",
          detail: "Student Updated",
          life: 3000,
        });
      } else {
        _students.push(_student);

        studentService.createStudent(_student);

        toast.current.show({
          severity: "success",
          summary: "Successful",
          detail: "Student Created",
          life: 3000,
        });
      }

      setStudents(_students);
      setStudentDialog(false);
      setStudent(emptyStudent);
    }
  };

  const editStudent = (student) => {
    setStudent({ ...student });
    setStudentDialog(true);
  };
  const viewStudent = (student) => {
    setStudent({ ...student });
    setViewStudentDialog(true);
  };

  const confirmDeleteStudent = (student) => {
    setStudent(student);
    setDeleteStudentDialog(true);
  };

  const deleteStudent = () => {
    let _students = students.filter((val) => val.id !== student.id);
    setStudents(_students);
    setDeleteStudentDialog(false);
    studentService.deleteStudent(student.id);
    setStudent(emptyStudent);
    toast.current.show({
      severity: "success",
      summary: "Successful",
      detail: "Student Deleted",
      life: 3000,
    });
  };

  const findIndexById = (id) => {
    let index = -1;
    for (let i = 0; i < students.length; i++) {
      if (students[i].id === id) {
        index = i;
        break;
      }
    }

    return index;
  };

  const onCityChange = (e) => {
    let city = cities.find((city) => city.name === e.value);
    const districtItems = districts
      .filter((e) => e.cityid === city.id)
      .map((a) => a.name);
    setDistrict(districtItems);

    let _student = { ...student };
    _student["city"] = city.name;
    setStudent(_student);
  };
  const onDistrictChange = (e) => {
    let _student = { ...student };
    _student["district"] = districts.find((d) => d.name === e.value).name;
    setStudent(_student);
  };

  const onInputChange = (e, name) => {
    const val = (e.target && e.target.value) || "";
    let _student = { ...student };
    _student[`${name}`] = val;

    setStudent(_student);
  };

  const leftToolbarTemplate = () => {
    return (
      <React.Fragment>
        <Button
          label="New"
          icon="pi pi-plus"
          className="p-button-success p-mr-2"
          onClick={openNew}
        />
      </React.Fragment>
    );
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <Button
          icon="pi pi-pencil"
          className="p-button-rounded p-button-success p-mr-2"
          onClick={() => editStudent(rowData)}
        />
        <Button
          icon="pi pi-trash"
          className="p-button-rounded p-button-warning"
          onClick={() => confirmDeleteStudent(rowData)}
        />
        <Button
          icon="pi pi-search"
          className="p-button-rounded p-button-error"
          onClick={() => viewStudent(rowData)}
        />
      </React.Fragment>
    );
  };

  const header = (
    <div className="table-header">
      <h5 className="p-m-0">Manage Students</h5>
      <span className="p-input-icon-left">
        <i className="pi pi-search" />
        <InputText
          type="search"
          onInput={(e) => setGlobalFilter(e.target.value)}
          placeholder="Search..."
        />
      </span>
    </div>
  );
  const studentDialogFooter = (
    <React.Fragment>
      <Button
        label="Cancel"
        icon="pi pi-times"
        className="p-button-text"
        onClick={hideDialog}
      />
      <Button
        label="Save"
        icon="pi pi-check"
        className="p-button-text"
        onClick={saveStudent}
      />
    </React.Fragment>
  );
  const deleteStudentDialogFooter = (
    <React.Fragment>
      <Button
        label="No"
        icon="pi pi-times"
        className="p-button-text"
        onClick={hideDeleteStudentDialog}
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        className="p-button-text"
        onClick={deleteStudent}
      />
    </React.Fragment>
  );

  return (
    <div className="datatable-crud-demo">
      <Toast ref={toast} />

      <div className="card">
        <Toolbar className="p-mb-4" left={leftToolbarTemplate}></Toolbar>

        <DataTable
          ref={dt}
          value={students}
          dataKey="id"
          paginator
          rows={10}
          rowsPerPageOptions={[5, 10, 25]}
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} students"
          globalFilter={globalFilter}
          header={header}
        >
          <Column headerStyle={{ width: "3rem" }}></Column>
          <Column field="name" header="Name" sortable></Column>
          <Column field="surname" header="Surname" sortable></Column>
          <Column field="mobilePhoneNumber" header="Phone Number"></Column>
          <Column field="city" header="City" sortable></Column>
          <Column field="district" header="District" sortable></Column>
          <Column field="description" header="Description"></Column>

          <Column body={actionBodyTemplate}></Column>
        </DataTable>
      </div>

      <Dialog
        visible={studentDialog}
        style={{ width: "450px" }}
        header="Student Details"
        modal
        className="p-fluid"
        footer={studentDialogFooter}
        onHide={hideDialog}
      >
        <div className="p-field">
          <label htmlFor="name">Name</label>
          <InputText
            id="name"
            value={student.name}
            onChange={(e) => onInputChange(e, "name")}
            required
            autoFocus
            className={classNames({ "p-invalid": submitted && !student.name })}
          />
          {submitted && !student.name && (
            <small className="p-error">Name is required.</small>
          )}
        </div>
        <div className="p-field">
          <label htmlFor="surname">Surname</label>
          <InputText
            id="surname"
            value={student.surname}
            onChange={(e) => onInputChange(e, "surname")}
            required
            autoFocus
            className={classNames({
              "p-invalid": submitted && !student.surname,
            })}
          />
          {submitted && !student.surname && (
            <small className="p-error">surname is required.</small>
          )}
        </div>
        <div className="p-field">
          <label htmlFor="mobilePhoneNumber">Phone Number</label>
          <InputMask
            mask="(+99) 999-999-99-99"
            id="mobilePhoneNumber"
            value={student.mobilePhoneNumber}
            onChange={(e) => onInputChange(e, "mobilePhoneNumber")}
            required
            autoFocus
            className={classNames({
              "p-invalid": submitted && !student.mobilePhoneNumber,
            })}
          />
          {submitted && !student.mobilePhoneNumber && (
            <small className="p-error">Phone Number is required.</small>
          )}
        </div>
        <div className="p-field">
          <label htmlFor="description">Description</label>
          <InputTextarea
            id="description"
            value={student.description}
            onChange={(e) => onInputChange(e, "description")}
          />
        </div>
        <div className="p-field">
          <label htmlFor="city">City</label>
          <Dropdown
            value={student.city}
            options={citySelectItems}
            required
            onChange={onCityChange}
            placeholder="Select a City"
            className={classNames({
              "p-invalid": submitted && !student.city,
            })}
          />
        </div>
        <div className="p-field p-col">
          <label htmlFor="district">District</label>
          <Dropdown
            value={student.district}
            required
            options={district}
            onChange={onDistrictChange}
            placeholder="Select a District"
          />
        </div>
      </Dialog>

      <Dialog
        visible={deleteStudentDialog}
        style={{ width: "450px" }}
        header="Confirm"
        modal
        footer={deleteStudentDialogFooter}
        onHide={hideDeleteStudentDialog}
      >
        <div className="confirmation-content">
          <i
            className="pi pi-exclamation-triangle p-mr-3"
            style={{ fontSize: "2rem" }}
          />
          {student && (
            <span>
              Are you sure you want to delete <b>{student.name}</b>?
            </span>
          )}
        </div>
      </Dialog>

      <Dialog
        visible={viewStudentDialog}
        style={{ width: "600px" }}
        header="Student Details"
        modal
        onHide={hideViewStudentDialog}
      >
        <div className="p-field">
          <span>Student Name = {student.name}</span>
        </div>
        <div className="p-field">
          <span>Student Surname = {student.surname}</span>
        </div>
        <div className="p-field">
          <span>Student Phone Number = {student.mobilePhoneNumber}</span>
        </div>
        <div className="p-field">
          <span>Student City = {student.city}</span>
        </div>
        <div className="p-field">
          <span>Student District = {student.district}</span>
        </div>
        <div className="p-field">
          <span>Student Description = {student.description}</span>
        </div>
        <div className="p-field">
          <span>Student Files</span>
        </div>
        <div className="p-field">
          <span>---------------------------------------</span>
        </div>
        <div className="p-field">
          <span>
            <FileUpload name="demo" url="./upload"></FileUpload>
          </span>
        </div>
      </Dialog>
    </div>
  );
}
