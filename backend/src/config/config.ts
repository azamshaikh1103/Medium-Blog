import { app } from "../middlewares/app";

export const runServer = () => {
  app.listen(process.env.PORT, () => {
    console.log(`server running at : ${process.env.PORT}`);
  });
};
