const Member = require("../model/Member");
const apiResponse = require("../helpers/apiResponse");

module.exports = {
  // Create new project member
  create: function (req, res) {
    Member.createMember(req.body, (err, result) => {
      if (err) return apiResponse.ErrorResponse(res, err.message);
      return res.json(result);
    });
  }
};
