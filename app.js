import express from "express"
import cors from "cors"
import mongoose, { startSession } from "mongoose"
import jwt from "jsonwebtoken"
import authMiddleware from "./middleware/auth.js"
import Usermodel from "./models/Usermodel.js";
import bcrypt from "bcryptjs"
import Expmodel from "./models/Expensemodel.js"


let app = express()
let PORT = 5000 || process.env.PORT
let URI = "mongodb+srv://wahab:admin@cluster0.459mmbw.mongodb.net/?appName=Cluster0";


mongoose
    .connect(URI)
    .then((res) => console.log("mongoDB connected"))
    .catch((err) => console.log("MongoDb Error:", err.message));


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors());



app.post("/signup", async (request, response) => {

    try {

        let { name, email, age, password } = request.body;


        console.log("real password", password);


        if (!email || !password) {
            return response.json({
                message: "Required fields are missing"
            })

        }


        let user = await Usermodel.findOne({ email })
        console.log("user", user);

        if (user) {
            return response.json({
                meaasge: "email Addres alerady exist",
                status: false
            })
        }

        let hashPassword = await bcrypt.hash(password, 10);

        const userObj = {
            ...request.body,
            password: hashPassword,
        };




        await Usermodel.create(userObj)

        response.json({
            message: "user sucessfully registered!",
            status: true
        })


        console.log("Email", request.body);



    } catch (error) {
        response.json({
            message: error.message || "Something want wrong",
            status: false
        })

    }

})




app.post("/login", async (request, response) => {


    try {

        let { email, password } = request.body

        let user = await Usermodel.findOne({ email })

        console.log("user", user);


        if (!user) {
            return response.json({
                message: "Email or Password  invalid",
                status: false
            })

        }

        let comprePass = await bcrypt.compare(password, user.password)
        console.log("comprePass", comprePass);



        if (!comprePass) {
            return response.json({
                message: "Email or Password  invalid",
                status: false
            })
        }



        let data = { _id: user._id }
        let PRIVATE_KEY = "abdulwahabyounus";
        let token = jwt.sign(data, PRIVATE_KEY, {
            expiresIn: "24h"
        })
        console.log("token", token);


        return response.json({
            message: "user successfully login",
            status: true,
            token,
        })

    } catch (error) {

        response.json({
            message: error.message || "Something want wrong",
            status: false
        })

    }

})



app.post("/createExp", authMiddleware, (request, response) => {

    response.json({
        meaasge: " Create Post Done"
    })

})


app.get("/getExp", authMiddleware, async (request, response) => {
    const { id } = request.body.id;
    Expmodel.find({ userId });
    response.json({
        meaasge: "Expense Done"
    })

})

// get current user expenses
app.get("/");

app.listen(PORT, () => {
    console.log(`server running on ${PORT}`)
})