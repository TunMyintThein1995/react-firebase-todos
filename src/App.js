import * as React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Layout/Header";
import Home from "./components/Pages/Home";
import LoginForm from "./components/AuthForms/LoginForm";
import RegisterForm from "./components/AuthForms/RegisterForm";
import AddUserForm from "./components/Forms/AddUserForm";
import EmployeeCreate from "./components/Pages/EmployeeCreate";
import DragDrop from "./components/DragDrop/DragDrop";
import CustomDrag from "./components/DragDrop/CustomDrag";
import UploadImageFile from "./components/UploadFile/UploadImageFile";
import AddUploadFile from "./components/UploadFile/AddUploadFile";


function App() {
  return (
    <React.Fragment>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route>
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<RegisterForm />} />
          </Route>
          <Route path="/adduserform" element={<AddUserForm />} />
          <Route path="/employee" element={<EmployeeCreate />} />
          <Route path="/uploadfile" element={<UploadImageFile />} />
          <Route path="/drag" element={<DragDrop />} />
          <Route path="/customdrag" element={<CustomDrag />} />
          <Route path="/adduploadfile" element={<AddUploadFile />} />
        </Routes>
      </BrowserRouter>
    </React.Fragment>
  );
};

export default App;
