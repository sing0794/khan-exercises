jQuery.extend(KhanUtil, {
    singleStockChangeConstantInflowLinearOutflowFinal: function( initstock, irate, ocoef, oconst, accuracy, period ) {
		var stockChange;
		if ( period >= accuracy) {
		    stockChange = irate * accuracy - ( ocoef * initstock + oconst ) * accuracy;
			return Math.round((KhanUtil.singleStockChangeConstantInflowLinearOutflowFinal( 
			                    initstock + stockChange, 
			                    irate, 
			                    ocoef, 
			                    oconst, 
			                    accuracy, 
			                    period - accuracy
			                ) * 100 ) / 100
			      );
		} else {
		    return initstock;
		}	
    },

    singleStockChangeConstantInflowLinearOutflowBehavior: function( initstock, irate, ocoef, oconst, accuracy, period, time ) {
        var iterations = period / accuracy;
		var stockChange;
		var currentStock;
		var stockBehavior = new Array();
		if ( iterations > 0) {
		    stockChange = irate * accuracy - ( ocoef * initstock + oconst ) * accuracy;
		    currentStock = initstock + stockChange;
		    stockBehavior.push([time, initstock]);
			return stockBehavior.concat(KhanUtil.singleStockChangeConstantInflowLinearOutflowBehavior( 
			                                currentStock, 
			                                irate, 
			                                ocoef, 
			                                oconst, 
			                                accuracy, 
			                                period - accuracy, 
			                                time + accuracy
			                            )
			       );
		} else {
		    return [[time, initstock]];
		}	
    },
    
    stockBehaviorOverTime: function( values ) {
		var stocksAsTable = "<BR>";
		var arrayLength = values.length;
		jQuery.each( values, function( i, stockAtTime ) {
		    if (i < arrayLength-1) {
    			stocksAsTable =  stocksAsTable + "At time: " + Math.round(stockAtTime[0]*100)/100 + " stock is: " + Math.round(stockAtTime[1]*100)/100 + "<BR>";
    		}
		});
		return stocksAsTable;
	},



});
