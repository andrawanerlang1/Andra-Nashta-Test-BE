const {
  getEventModel,
  postEventModel,
  getEventCountModel,
  getSearchEventModel,
} = require("../model/event");
const helper = require("../helper/response");
const qs = require("querystring");

module.exports = {
  postEvent: async (request, response) => {
    try {
      const { title, location, date, participant, note } = request.body;

      const setData = {
        title,
        location,
        date,
        participant,
        note,
        image: request.file === undefined ? "" : request.file.filename,
        created_at: new Date(),
      };
      const result = await postEventModel(setData);
      return helper.response(response, 200, "Post Item Successful", result);
    } catch (error) {
      return helper.response(response, 400, "Bad Request", error);
    }
  },
  getEvent: async (request, response) => {
    try {
      const result = await getEventModel();
      return helper.response(response, 200, "Get Event Successful", result);
    } catch (error) {
      return helper.response(response, 400, "Bad Request", error);
    }
  },
  getSearchEvent: async (request, response) => {
    try {
      let { page, limit, search } = request.query;
      page = parseInt(page);
      limit = parseInt(limit);

      const totalData = await getEventCountModel(search);
      const totalPage = Math.ceil(totalData / limit);
      const offset = page * limit - limit;
      const pageInfo = {
        page,
        totalPage,
        limit,
        totalData,
      };
      const result = await getSearchEventModel(search, limit, offset);
      return helper.response(
        response,
        200,
        "Get Event Successful",
        result,
        pageInfo
      );
    } catch (error) {
      return helper.response(response, 400, "Bad Request", error);
    }
  },
};
