class ApiFeatures {
    constructor(query, queryStr) {
        this.query = query;
        this.queryStr = queryStr
    }

    search() {
        const keyword = this.queryStr.keyword
            ? {
                name: {
                    $regex: this.queryStr.keyword,    //mongdb regular expression 
                    $options: 'i'   // case insensitive
                }
            } :
            {}

        //product.find() method is gonna be changed according to the search, we are gonna pass the keyword which we made using regex

        // you will use spread operator here to spread the words of a string (string acts as an array of characters)
        this.query = this.query.find({ ...keyword })
        // console.log(this)   //return the class ApiFeatures
        return this
    }

    filter() {
        // make the copy of the queryStr so that the original queryStr will not be changed
        // const queryStrCopy = this.queryStr   // it will pass reference to the queryStrCopy, but we want an actual copy so this command will not work, instead

        const queryStrCopy = { ...this.queryStr };
        console.log(queryStrCopy)

        //remove the keyword, pagination, limit etc fields first so that we can filter the products based on the price and rating
        const removeFields = ["keyword", "page", "limit"];

        removeFields.forEach((key) => delete queryStrCopy[key]);
        console.log(queryStrCopy)

        // filter for price and rating, gt for greater than, gte for greater than and equal to, lt is for less than, lte is for less than and equal to
        // you have to add a dollar sign before gt, gte, lt or lte as mongodb expressions work with $ sign, first convert the querySTrCopy object into json string
        let theQueryStr = JSON.stringify(queryStrCopy);
        theQueryStr = theQueryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);

        this.query = this.query.find(JSON.parse(theQueryStr));

        return this;
    }

    sort() {
        // sort products based on the createdAt time, old to new or new to old
        const sortTheProducts = {}
        if (this.queryStr.sortBy) {
            const parts = this.queryStr.sortBy.split('_')
            sortTheProducts[parts[0]] = parts[1] === 'desc' ? -1 : 1  //// check the condition parts[1] === 'desc' if it is true then set the property on sort sort[parts[0]] equal to -1 otherwise 1
        }

        // sort products based on prices
        if (this.queryStr.sortProducts) {
            const parts = this.queryStr.sortProducts.split('_')
            sortTheProducts[parts[0]] = parts[1] === 'desc' ? -1 : 1
        }

        this.query = this.query.sort(sortTheProducts)
        return this
    }

    pagination(resultPerPage) {
        const currentPage = parseInt(this.queryStr.page) || 1
        const skip = resultPerPage * (currentPage - 1)
        this.query = this.query.limit(resultPerPage).skip(skip )
        return this
    }
}

module.exports = ApiFeatures