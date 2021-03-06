exports.ErrorResponse = function (res, msg) {
  var data = {
    status: 0,
    message: msg
  };
  return res.status(500).json(data);
};

exports.notFoundResponse = function (res, msg) {
  var data = {
    status: 0,
    message: msg
  };
  return res.status(404).json(data);
};

exports.validationErrorWithData = function (res, msg, data) {
  var resData = {
    status: 0,
    message: msg,
    data: data
  };
  res.status(400).json({ msg: resData });
};

exports.unauthorizedResponse = function (res, msg) {
  var data = {
    status: 0,
    message: msg
  };
  return res.status(401).json(data);
};
