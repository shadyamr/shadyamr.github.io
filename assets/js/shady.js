/*
 * FFS
 */

$(document).ready(function() {
	//Shortener Container.
 	$('.container.shorten-container').css({
 		top:'50%', left:'50%', margin:'-' + ($('.container.shorten-container').height() / 2)+'px 0 0 -' + ($('.container.shorten-container').width() / 2) + 'px'
 	});

 	//Dropdown.
 	$('ul.nav li.dropdown').hover(function() {
 		$(this).find('.dropdown-menu').stop(true, true).delay(200).slideDown('fast');
 		$(this).delay(200).toggleClass('dropdown_open', 150);
 	}, function() {
 		$(this).find('.dropdown-menu').stop(true, true).delay(200).slideUp('fast');
 		$(this).delay(200).toggleClass('dropdown_open', 150);
 	});

 	//Documentation Nav.
 	$('body').scrollspy({ target: '.navbar-docs' });
 	$('.navbar-docs').css('width', $('.row .col-md-3').width() + 'px');

 	$('form.shorten').submit(function( event ) {
 		event.preventDefault();
 		var ori_url = $('input[name="url"]').val();
 		if( ori_url !== '' ) {
 			$.ajax({
 				type: "GET",
 			    crossDomain: true,
 			    url: "http://api.ffs.im/",
 			    data: { url: ori_url },
 			    dataType: "jsonp",
 			    success: function( data ) {
 				    if( data.result !== 0 ) {
 					    $('.feedback').html('<div class="alert alert-success">' + data.result + ' <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button></div>').fadeIn();
 				    } else {
 					    $('.feedback').html('<div class="alert alert-danger">Incorrect link format. <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button></div>').fadeIn();
 				    }
 			    },
 			    error: function( xhr, status ) {
 				    $('.feedback').html('<div class="alert alert-danger">Error, please try again later. <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button></div>').fadeIn();
 			    }
 		    });
 		    $('input[name="url"]').empty();
 		} else {
 			$('.feedback').html('<div class="alert alert-danger">Please enter a URL.<button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button></div>');
 		}
 	});
});

$(function() {
	//URL GET
 	var getvar = urlGET('http://ffs.im');
 	console.log(getvar);
 	if( getvar !== null ) {
 		$.ajax({
 			type: "GET",
 			crossDomain: true,
 			url: "http://api.ffs.im/",
 			data: { api: "shorten", cmd: "fromCode", code: getvar },
 			dataType: "jsonp",
 			success: function( data ) {
 				if( data.result !== 0 ) {
 					$('.feedback').html('<div class="alert alert-success">Redirecting... <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button></div>').fadeIn();
 				    window.location.href = data.result;
 				} else {
 					$('.feedback').html('<div class="alert alert-danger">Link is invalid. Why not create it? <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button></div>').fadeIn();
 				}
 			},
 			error: function( xhr, status ) {
 				$('.feedback').html('<div class="alert alert-danger">Error, please try again later. <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button></div>').fadeIn();
 			}
 		});
 	}
 	
});

//Form when creating new url. Deprecated.
function submitLink() {
	var ori_url = $('input[name="url"]').val();
	$.ajax({
		type: "GET",
		crossDomain: true,
		url: "http://api.ffs.im/",
		data: { url: ori_url },
		dataType: "jsonp",
		success: function( data ) {
			if( data.result !== 0 ) {
				$('.feedback').html('<div class="alert alert-success">' + data.result + ' <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button></div>').fadeIn();
			} else {
				$('.feedback').html('<div class="alert alert-danger">Incorrect link format. <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button></div>').fadeIn();
			}
		},
		error: function( xhr, status ) {
			$('.feedback').html('<div class="alert alert-danger">Error, please try again later. <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button></div>').fadeIn();
		}
	});
	$('input[name="url"]').empty();
}

//URL Parameter
function urlGET(site_url) {
	var real_url = window.location.href;
	var name     = real_url.split(site_url + '/');
	if( !name[1] || 0 === name.length ) {
		return null;
	} else {
		return name[1];
	}
}

//GET Parameters
function GET(name) {
  return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null
}