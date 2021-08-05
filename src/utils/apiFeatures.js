class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    let queryObj = { ...this.queryString };

    // Remove these fields from query object
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach((el) => delete queryObj[el]);

    /**
     * Convert gte to $gte
     * Convert lte to $lte
     * etc....
     */
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    queryObj = JSON.parse(queryStr);

    /**
     * Gotcha for  products
     * request = { sizes : ['S','M'] }
     * requestModified = { sizes: { $all : ['S','M']} }
     */
    const { sizes } = queryObj;

    if (sizes) {
      delete queryObj.sizes;
      queryObj = { ...queryObj, sizes: { $all: sizes } };
    }

    this.query = this.query.find(queryObj);

    return this;
  }

  sort() {
    if (this.queryString.sort) {
      const sortQueryString = this.queryString.sort.split(',').join(' ');
      this.query = this.query.sort(sortQueryString);
    }
    return this;
  }

  limitFields() {
    if (this.queryString.fields) {
      const fieldsQueryString = this.queryString.fields.split(',').join(' ');
      this.query = this.query.select(fieldsQueryString);
    } else {
      this.query = this.query.select('-__v');
    }
    return this;
  }

  paginate() {
    const { limit, page } = this.queryString;
    const skip = (page - 1) * limit;

    this.query = this.query.skip(skip).limit(limit * 1);

    return this;
  }
}

module.exports = APIFeatures;
