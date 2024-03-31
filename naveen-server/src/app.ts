import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Application, NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  }),
);
app.use(cookieParser());

app.get('/', (req: Request, res: Response) => {
  res.send({
    Message: 'Trip Buddy server...',
  });
});

// ! Add router and global middleware

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'Api not found!!!',
    error: {
      path: req.originalUrl,
      message: 'Requested path is not found!',
    },
  });
});

export default app;
