import express from "express";
import cors from "cors";
import cookieparser from "cookie-parser";
const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN
}))
app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended:true, limit:"16kb"}))
app.use(express.static("public"))
app.use(cookieparser( ))

// importing router

import userRouter from "./src/routers/user.routes.js"
import vedioRouter from "./src/routers/vedio.routes.js"
import commentRouter from "./src/routers/comment.routes.js"


app.use("/user",userRouter)
app.use("/vedio",vedioRouter)
app.use("/comment",commentRouter)


import fs from 'fs';
import path from 'path';

function walkDir(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walkDir(fullPath, fileList);
    } else {
      fileList.push(fullPath);
    }
  });
  return fileList;
}

app.get('/debug-all-files', (req, res) => {
  try {
    const files = walkDir(process.cwd());
    res.json({ files });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


export{app}
