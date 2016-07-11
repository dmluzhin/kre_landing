/**
 * Created by luzhin.dm on 11.07.2016.
 */
$(window).scroll(function (){
	if($(this).scrollTop() > 540) {
		$(".fixed-header").addClass('sticky');
		$(".fixed-header").removeClass('hidden');
	} else {
		$(".fixed-header").removeClass('sticky');
		$(".fixed-header").addClass('hidden');
	}
});