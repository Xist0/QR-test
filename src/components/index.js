// index.js

// Используем ESM синтаксис для импорта fs
import fs from 'fs';

const dataFilePath = './data.json';

// Остальной код остается без изменений
function readDataFromFile() {
  try {
    const data = fs.readFileSync(dataFilePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

function writeDataToFile(data) {
  fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), 'utf-8');
}

export function addOrder(order) {
  const orders = readDataFromFile();
  orders.push(order);
  writeDataToFile(orders);
}

export function getAllOrders() {
  return readDataFromFile();
}
