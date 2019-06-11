exports.success = (res, data) => {
    return res.status(200).json({
        status: "success",
        data: data
    })
};

exports.successWithoutResponse = (res) => {
    return res.status(204).json({
        status: "success"
    })
};

exports.failWithBadRequest = (res, message = "bad request") => {
    return res.status(400).json({
        status : "error",
        message : message
    })
};

exports.failWithNotFound = (res, message = "Not Found") => {
    return res.status(404).json({
        status : "error",
        message : message
    })
};


exports.failNotAuthorized= (res, message = "Unauthorized") => {
    return res.status(403).json({
        status : "error",
        message : message
    })
};

exports.failUnprocessableEntity= (res, message = "Unprocessable Entity") => {
    return res.status(422).json({
        status : "error",
        message : message
    })
};

