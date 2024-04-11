// require('dotenv').config({path : './env'})
import dotenv from "dotenv"
import connectDB from "./db/index.js"


dotenv.config({
    path:'./env'
})



connectDB();
















/* --> Establishing connection using effy method 
;(async()=>{
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)

        app.on("error" , (error) => {
            console.log("ERRR: " , error)
            throw error
        })

        app.listen(process.env.PORT , () => {
            console.log(`Server Started at ${process.env.PORT}`)
        })
    } catch (error) {
        console.log("Error: " , error);
        throw error
    }
})()

*/