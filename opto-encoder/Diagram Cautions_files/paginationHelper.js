var PaginationHelper = (function(){
	
	var results = [];
	var totalPages = 1;
	
	function initialize(res, options) {		
		this.results = res;
		
		var options = options || {};
		this.pageSize = options.pageSize || 10;
		
		this.totalPages = Math.ceil(this.results.length / this.pageSize);
	}
	
	function getPage(pageNr) {
		
		if (pageNr < 1 || pageNr > this.totalPages) {
			return {}
		}
		
		var startIndex = (pageNr - 1) * this.pageSize;
		var endIndex = startIndex + this.pageSize;
		
		return {
			resultSet: this.results.slice(startIndex, endIndex),
			currentPage: pageNr,
			totalPages: this.totalPages,
			firstResult: startIndex + 1,
			lastResult: endIndex < this.results.length ? endIndex : this.results.length,
			totalResults: this.results.length		
		}		
	}
	
	return {
		initialize: initialize,
		getPage: getPage
	}
	
})();