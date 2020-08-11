import React, { useState } from "react";
import axios from "axios";

const OrderList = () => {
  const [formValue, setFormValue] = useState({
    id: 0,
    phoneNumber: "",
  });
  const [order, setOrder] = useState({});
  const [notFound, setNotFound] = useState(false);

  const fetchOrder = (stateFn, queryData) => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/order/`, {
        params: { ...queryData },
      })
      .then((resp) => {
        stateFn({ ...resp.data });
        setNotFound(false);
      })
      .catch((error) => {
        console.error(error);
        setNotFound(true);
      });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    fetchOrder(setOrder, formValue);
  };

  const validateNumber = (data) => {
    const cleanData = data.target.value.replace(/\D/g, "");
    setFormValue({ ...formValue, [data.target.name]: cleanData });
  };

  return (
    <div>
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
              <button type="submit" className="btn btn-success">
                Buscar
              </button>
            </div>
          </div>
        </div>
      </form>
      {notFound ? (
        <div className="form-group col-md-6">
          <span className="text-danger">Pedido não encontrado</span>
        </div>
      ) : (
        ""
      )}
      <div className="form-group col-md-6">
        <h3>Dados do Pedido</h3>
        <div>Celular: {order.phoneNumber}</div>
        <div>Valor: {order.amount}</div>
      </div>
    </div>
  );
};

export default OrderList;
