$.fn.dataTable.ext.type.order['moment-dd/MM/YYYY-pre'] = function ( d ) {
    return moment( d, 'DD/MM/YYYY').unix();
};