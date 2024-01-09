import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useParams } from 'react-router-dom';
import QRCode from 'qrcode.react';
import { useReactToPrint } from 'react-to-print';
import { addOrder, getAllOrders } from './components/index.js';
import './App.css';

const QRCodeComponent = React.forwardRef(({ data }, ref) => (
  <div className="qr-code" ref={ref}>
    <QRCode value={data.qrCode} />
  </div>
));

const OrderDetails = () => {
  const { orderId } = useParams();
  const orders = getAllOrders();
  const order = orders.find((o) => o.id === orderId);

  return (
    <div>
      <h1>Детали заказа {orderId}</h1>
      <p>ФИО: {order.fullName}</p>
      <p>Номер телефона: {order.phoneNumber}</p>
      <p>Адрес: {order.address}</p>
    </div>
  );
};

const MainComponent = ({ orderData, setOrderData, orders, uniqueQRCodes, setOrders, setUniqueQRCodes }) => {
  const qrCodeRef = React.useRef(null);

  const handleOrderSubmit = () => {
    const generatedOrderId = `ORDER-${Math.floor(Math.random() * 1000000)}`;
    
    // Проверка на уникальность QR-кода
    if (uniqueQRCodes.has(generatedOrderId)) {
      alert('QR-код уже существует. Пожалуйста, попробуйте снова.');
      return;
    }

    const order = {
      id: generatedOrderId,
      fullName: orderData.fullName,
      phoneNumber: orderData.phoneNumber,
      address: orderData.address,
      qrCode: generatedOrderId,
    };

    // Очищаем массив заказов перед добавлением нового заказа
    setOrders([order, ...orders]);
    setUniqueQRCodes(new Set([generatedOrderId]));
    
    setOrderData({
      fullName: '',
      phoneNumber: '',
      address: '',
    });

    // Сохраняем данные в файл
    addOrder(order);

    // Выводим данные в консоль в виде JSON
    console.log(JSON.stringify(order));
  };

  const handlePrint = useReactToPrint({
    content: () => qrCodeRef.current,
  });

  return (
    <div className="app-container">
      <h1>Создание заказа</h1>
  
      <div className="input-container">
        <label>ФИО:</label>
        <input
          type="text"
          value={orderData.fullName}
          onChange={(e) => setOrderData({ ...orderData, fullName: e.target.value })}
        />
      </div>
  
      <div className="input-container">
        <label>Номер телефона:</label>
        <input
          type="text"
          value={orderData.phoneNumber}
          onChange={(e) => setOrderData({ ...orderData, phoneNumber: e.target.value })}
        />
      </div>
  
      <div className="input-container">
        <label>Адрес:</label>
        <input
          type="text"
          value={orderData.address}
          onChange={(e) => setOrderData({ ...orderData, address: e.target.value })}
        />
      </div>
  
      <button className="submit-button" onClick={handleOrderSubmit}>
        Создать заказ
      </button>
  
      {orders.map((order) => (
        <div key={order.id} className="order-details">
          <div className="order-data">
            <h2>Данные заказа:</h2>
            <p>ФИО: {order.fullName}</p>
            <p>Номер телефона: {order.phoneNumber}</p>
            <p>Адрес: {order.address}</p>
          </div>
  
          <div className="qr-code-section">
            <h2>QR-код заказа</h2>
            <QRCodeComponent ref={qrCodeRef} data={order} />
            <button className="download-button" onClick={handlePrint}>
              Распечатать QR-код
            </button>
            <Link to={`/qrCode/${order.id}`}>Перейти к деталям заказа</Link>
          </div>
        </div>
      ))}
    </div>
  );
};

const App = () => {
  const [orderData, setOrderData] = useState({
    fullName: '',
    phoneNumber: '',
    address: '',
  });

  const orders = getAllOrders();
  const [uniqueQRCodes, setUniqueQRCodes] = useState(new Set(orders.map((order) => order.id)));

  return (
    <Router>
      <Routes>
        <Route path="/qrCode/:orderId" element={<OrderDetails />} />
        <Route
          path="/"
          element={
            <MainComponent
              orderData={orderData}
              setOrderData={setOrderData}
              orders={orders}
              uniqueQRCodes={uniqueQRCodes}
              setOrders={() => {}}
              setUniqueQRCodes={() => {}}
            />
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
