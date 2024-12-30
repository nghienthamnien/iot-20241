import e, { Request, Response } from "express";
import { EventEmitter } from "events";
import DeviceControl from "../model/control";
import History from "../model/history";

export const eventEmitter = new EventEmitter();

export const getController = async () => {
  try {
    const response = await DeviceControl.find();

    if (response.length > 0) {
      const jsonData = response[0];
      console.log("Data from Firestore:", jsonData);
      return jsonData;
    } else {
      console.log("Document does not exist");
      // Xử lý trường hợp không tìm thấy tài liệu
      return null; // hoặc trả về giá trị mặc định khác phù hợp
    }
  } catch (error: any) {
    console.error("Error fetching data from Firestore:", error);
    // Xử lý lỗi nếu cần
    return null; // hoặc trả về giá trị mặc định khác phù hợp
  }
};

export const updateControl = async (message: any) => {
  try {
    const data = JSON.parse(message.toString());
    console.log("Data from ESP32: line 61:", data);
    let name: string;
    if (data && data.hasOwnProperty("name")) {
      name = data.name;
    } else {
      console.log("data.name does not exist");
    }
    const ledStatus = data.ledStatus;
    const pumpStatus = data.pumpStatus;
    const ledAutoModeStatus = data.ledAutoMode;
    const pumpAutoModeStatus = data.pumpAutoMode;

    const response = await DeviceControl.find();
    const jsonData = response[0];
    // console.log("Data from Firestore:", jsonData);
    const ledStatusControl = jsonData?.ledMode ? jsonData.ledMode : 0;
    const pumpStatusControl = jsonData?.pumpMode ? jsonData.pumpMode : 0;
    // console.log("ledStatusControl:", ledStatusControl);
    // console.log("pumpStatusControl:", pumpStatusControl);
    console.log("led", ledStatus === ledStatusControl);
    console.log("pump", pumpStatus === pumpStatusControl);
    const addActionToHistory = async (message: string) => {
      await History.create({
        name: name,
        message: message,
        createdAt: new Date().getTime(),
      });
    };

    if (
      ledAutoModeStatus === 0 &&
      pumpAutoModeStatus === 0 &&
      data.hasOwnProperty("name")
    ) {
      console.log("Tắt chế độ tự động");

      if (ledStatus !== ledStatusControl && pumpStatus !== pumpStatusControl) {
        console.log(
          ledStatus === 1 && pumpStatus === 1
            ? "Bật đèn và bật bơm nước"
            : "Tắt đèn và tắt bơm nước"
        );
        await addActionToHistory(
          ledStatus === 1 && pumpStatus === 1
            ? "Bật đèn và bật bơm nước"
            : "Tắt đèn và tắt bơm nước"
        );
      } else {
        if (
          ledStatus !== ledStatusControl &&
          pumpStatus === pumpStatusControl
        ) {
          console.log(ledStatus === 1 ? "Bật đèn" : "Tắt đèn");
          await addActionToHistory(ledStatus === 1 ? "Bật đèn" : "Tắt đèn");
        } else {
          if (
            ledStatus === ledStatusControl &&
            pumpStatus !== pumpStatusControl
          ) {
            console.log(pumpStatus === 1 ? "Bật bơm nước" : "Tắt bơm nước");
            await addActionToHistory(
              pumpStatus === 1 ? "Bật bơm nước" : "Tắt bơm nước"
            );
          }
        }
      }
    } else if (
      ledAutoModeStatus === 0 &&
      pumpAutoModeStatus === 1 &&
      data.hasOwnProperty("name")
    ) {
      if (ledStatus !== ledStatusControl) {
        console.log(ledStatus === 1 ? "Bật đèn" : "Tắt đèn");
        await addActionToHistory(ledStatus === 1 ? "Bật đèn" : "Tắt đèn");
      }
    } else if (
      ledAutoModeStatus === 1 &&
      pumpAutoModeStatus === 0 &&
      data.hasOwnProperty("name")
    ) {
      if (pumpStatus !== pumpStatusControl) {
        console.log(pumpStatus === 1 ? "Bật bơm nước" : "Tắt bơm nước");
        await addActionToHistory(
          pumpStatus === 1 ? "Bật bơm nước" : "Tắt bơm nước"
        );
      }
    }

    const updateObject = {
      ledMode: ledStatus,
      pumpMode: pumpStatus,
      ledAutoMode: ledAutoModeStatus,
      pumpAutoMode: pumpAutoModeStatus,
    };

    await DeviceControl.updateOne({ _id: jsonData._id }, updateObject);

    console.log("Data added to Firestore successfully!");
  } catch (error) {
    console.error("Error processing message:", error);
  }
};
