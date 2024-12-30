// import { user } from "../config/connectDB";
import { Request, Response } from "express";
import User from "../model/user";

declare module "express-session" {
  export interface SessionData {
    user: { [key: string]: any }; // Add a user property to SessionData
  }
}

// import jwt from "jsonwebtoken";
export const createUser = async (req: Request, res: Response) => {
  const { username, password, gmail } = req.body;
  try {
    const IsUserExisting = await User.findOne({ gmail });

    if (IsUserExisting) {
      res
        .status(400)
        .send(
          "Account's gmail already exits, please change different username !"
        );
    } else {
      await User.create(req.body);
      res.status(200).send({
        status: "success",
        message: "Account added, register successfully !",
      });
    }
  } catch (error: any) {
    res.status(500).json(error.message);
  }
};

export const findUserById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const doc = await User.findById(id);

    if (!doc) {
      res.status(404).send("User not found");
    } else {
      res.status(200).send(doc);
    }
  } catch (error: any) {
    res.status(500).json(error.message);
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const gmail: string = req.body.gmail;
    const password: string = req.body.password;

    const user = await User.findOne({ gmail, password });

    if (!user) {
      res.send("Account not exist, please register or login again !");
      console.log("Login fail !");
    }

    res.status(200).send({
      status: "success",
      message: "Login successfully !",
      payload: {
        username: user?.username,
        id: user?.id,
      },
    });
  } catch (error) {
    console.log(error);
  }
};
