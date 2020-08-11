import React, { useState } from "react";
import axios from "axios";

const OrderCreate = () => {
  const [formValue, setFormValue] = useState({
    id: "",
    phoneNumber: "",
    amount: 0,
    createdDate: new Date(),
  });
  const [success, setSuccess] = useState(false);

  const postOrder = (stateFn, bodyData) => {
    bodyData.createdDate = new Date();
    axios
      .post(`${process.env.REACT_APP_API_URL}/order/`, { ...bodyData })
      .then(() => {
        stateFn({
          id: "",
          phoneNumber: "",
          amount: 0,
          createdDate: new Date(),
        });
        setSuccess(true);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    postOrder(setFormValue, formValue);
  };

  const handleChange = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };

  const validateNumber = (e) => {
    e.target.value = e.target.value.replace(/\D/g, "");
    handleChange(e);
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="form-row">
        <div className="form-group col-md-6">
          <div className="form-group col-md-6">
            <label htmlFor="">Id</label>
            <input
              type="number"
              name="id"
              className="form-control"
              id="id"
              placeholder="digite um Id"
              onChange={validateNumber}
              required
            />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="phoneNumber">Celular </label>
            <input
              type="text"
              name="phoneNumber"
              className="form-control"
              id="phoneNumber"
              placeholder="digite um numero de celular"
              onChange={validateNumber}
              required
            />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="phoneNumber">Valor </label>
            <input
              type="number"
              name="amount"
              className="form-control"
              id="amount"
              placeholder="digite um valor"
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group col-md-6">
            <button type="submit" className="btn btn-success">
              Cadastrar
            </button>
          </div>
          {success ? (
            <div className="form-group col-md-6">
              <span className="text-success">Pedido salvo com sucesso!</span>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </form>
  );
};

export default OrderCreate;
