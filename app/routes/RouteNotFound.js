import httpStatus from "http-status";

const RouteNotFound = (req, res) => {
    res.status(httpStatus.NOT_FOUND).json({
        success: false,
        message: 'Not Found',
        errorMessages: [
            {
                path: req.originalUrl,
                message: 'API Not Found',
            },
        ],
    });
    // const filePath = path.join(process.cwd(), 'public', 'html', 'NotFound.html');
    // res.sendFile(filePath);
}

export default RouteNotFound;