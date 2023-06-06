module.exports.paginate =  (query, page, pageSize) => {
    const pageNumber = Math.max(1, parseInt(page) || 1);
    const pageSizeNumber = parseInt(pageSize) || 0;
  
    const skip = (pageNumber - 1) * pageSizeNumber;
    const limit = pageSizeNumber > 0 ? pageSizeNumber : undefined;
  
    return query.skip(skip).limit(limit);
  };