module.exports = (model, page, pageSize) => {
  const pageNumber = Math.max(1, parseInt(page) || 1);
  const pageSizeNumber = parseInt(pageSize) || 10;

  const skip = (pageNumber - 1) * pageSizeNumber;
  const limit = pageSizeNumber;

  const query = model.find({}).skip(skip).limit(limit);
  const countQuery = model.countDocuments();

  return Promise.all([query.exec(), countQuery.exec()]).then(([results, total]) => {
    const totalPages = Math.ceil(total / pageSizeNumber);
    return {
      results,
      page: pageNumber,
      pageSize: pageSizeNumber,
      totalResults: total,
      totalPages,
    };
  });
};