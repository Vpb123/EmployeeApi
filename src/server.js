const express = require("express");

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 8000;

const router = require("./routers/employee")
app.use(router);

app.get('/', (req,res) =>{
    res.json({
        confirmation:"Success",
        message:"Welcome to the Employee Management API"
    });
});


app.listen(PORT, () => {
    console.log(`Server is live on port ${PORT}`);
});