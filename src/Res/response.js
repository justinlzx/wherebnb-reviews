class Res {
  successResponse = (res, data, code) => {
    return res.status(code || 200).json({
      success: true,
      data,
    });
  };
  errorResponse = (res, data, code) => {
    return res.status(code || 400).json({
      success: false,
      data,
    });
  };
  internalServerErrorResponse = (res, data) => {
    return res.status(500).json({
      success: false,
      data,
    });
  };
}

export default new Res();
