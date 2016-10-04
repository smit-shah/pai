$(document).ready(function(){
	var now = moment();
	$(".moment").each(function(){
		var time = moment($(this).attr('datetime'));
		$(this).html(time.from(now));
	});

	if ($('#allPages').length > 0) {
		$('#allPages').find('tr').hover(function(){
			$(this).find('.action').show();
		}, function(){
			$(this).find('.action').hide();
		});
	}

	if ($('#allUsers').length > 0) {
		$('#allUsers').find('tr').hover(function(){
			$(this).find('.action').show();
		}, function(){
			$(this).find('.action').hide();
		});
	}
});