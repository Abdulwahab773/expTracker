let authMiddleware = (request, response, next) => {

    try {

        let PRIVATE_KEY = "abdulwahabyounus";
        let token = request?.headers?.authorization?.split(" ")[1]

        let isVerify = jwd.verify(token, PRIVATE_KEY)

        if (isVerify._id) {
            next()
        } else {

            response.json("unAuth user")

        }
    } catch (error) {
        response.json({
            message: error.meaasge || "something went wrong"
        })
    }
}


export default authMiddleware