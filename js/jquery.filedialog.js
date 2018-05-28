$.fileDialog = (function() {
	var _FILE_ID = 'jqueryFileDialogPlugin',

	_open = function(option) {
		if(!option) { throw 'argument is invalid'; }
		_clear();
	    $('<input>')
	    .prop({ 
	    	type: 'file',
	    	id: _FILE_ID,
	    	accept: option.accept
	    })
	    .css({ display: 'none' })
	    .appendTo($('body'));

	    $('#' + _FILE_ID).trigger('click');
	    $('#' + _FILE_ID).on('change', function() {
	    	if(option.onChange) {
	    		option.onChange($('#' + _FILE_ID).prop('files'));
	    	}
	    	_clear();
	    });
	},

	_clear = function() {
		$('#' + _FILE_ID).off('change');
		if($('#' + _FILE_ID).length) { $('#' + _FILE_ID).remove(); }
	};

	return {
		open: _open,
		clear: _clear
	};
}());