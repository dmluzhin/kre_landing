!function(){"use strict";$(".j-popup-close").on("click",function(){$(this).parent().arcticmodal("close")}),$(".j-input-time").on("focusin",function(){$(this).attr({type:"time",value:"12:00"})}).on("focusout",function(){$(this).attr("type","text")}),$(".j-phone-masked").on("keydown",function(e){$.inArray(e.keyCode,[46,8,9,27,13,110,190])!==-1||65==e.keyCode&&(e.ctrlKey===!0||e.metaKey===!0)||e.keyCode>=35&&e.keyCode<=40||(e.shiftKey||e.keyCode<48||e.keyCode>57)&&(e.keyCode<96||e.keyCode>107)&&e.preventDefault()}),$(".j-scrollto-link").on("click",function(e){return $.scrollTo($(this).data("scrollto-block"),{duration:500}),!1})}(),function(){"use strict";Array.prototype.max=function(){return Math.max.apply(null,this)},Array.prototype.min=function(){return Math.min.apply(null,this)};var e=angular.module("main",[]);e.controller("mainController",["$scope","$http","$httpParamSerializerJQLike",function(e,r,o){function t(e){var r=/(\d+)(\d{3})/;return String(e).replace(/^\d+/,function(e){for(;r.test(e);)e=e.replace(r,"$1 $2");return e})}function n(e,r){return r.discount-e.discount}e.callbackFormData={},e.signFormData={},e.orderFormData={},e.subFormData={},e.barkliBrokerFormData={},e.isCallbackFormSended=!1,e.isSignFormSended=!1,e.issubFormSended=!1,e.isOrderFormSended=!1,e.isBarkliBrokerFormSended=!1,e.currentTab=2,e.params=[],e.country=[],e.commerc=[],e.showCallbackPopup=function(){e.isCallbackFormSended&&(e.isCallbackFormSended=!1),$(".j-popup-callback").arcticmodal()},e.sendCallbackForm=function(){e.callbackForm.$valid&&(e.callbackFormData.subject="Заказать обратный звонок. Скидки.",r({method:"POST",url:"/sendmail.php",data:o(e.callbackFormData),headers:{"Content-Type":"application/x-www-form-urlencoded"}}).success(function(r){e.callbackForm.$setPristine();for(var o in e.callbackFormData)e.callbackFormData[o]="";e.isCallbackFormSended=!0,setTimeout(function(){$(".j-popup-callback").arcticmodal("close")},3e3)}))},e.showSignPopup=function(){e.isSignFormSended&&(e.isSignFormSended=!1),$(".j-popup-gratitude-sign").arcticmodal()},e.sendSignForm=function(){e.signForm.$valid&&(e.signFormData.subject="Подписка на Discount",r({method:"POST",url:"/sendmail.php",data:o(e.signFormData),headers:{"Content-Type":"application/x-www-form-urlencoded"}}).success(function(r){e.signForm.$setPristine();for(var o in e.signFormData)e.signFormData[o]="";e.isSignFormSended=!0,setTimeout(function(){$(".j-popup-gratitude-sign").arcticmodal("close")},3e3)})),console.log(e.signForm)},e.sendOrderForm=function(){e.orderForm.$valid&&(e.orderFormData.subject="Заказать обратный звонок",r({method:"POST",url:"/sendmail.php",data:o(e.orderFormData),headers:{"Content-Type":"application/x-www-form-urlencoded"}}).success(function(r){$(".j-popup-gratitude-request").arcticmodal(),setTimeout(function(){$(".j-popup-gratitude-request").arcticmodal("close")},3e3),e.orderForm.$setPristine();for(var o in e.orderFormData)e.orderFormData[o]="";e.isOrderFormSended=!0,setTimeout(function(){$(".j-popup-gratitude-request").arcticmodal("close")},3e3)}))},e.sendSubForm=function(){e.subForm.$valid&&(e.subFormData.subject="Подписка на Discount",r({method:"POST",url:"/sendmail.php",data:o(e.subFormData),headers:{"Content-Type":"application/x-www-form-urlencoded"}}).success(function(r){$(".j-popup-gratitude-sign").arcticmodal(),setTimeout(function(){$(".j-popup-gratitude-sign").arcticmodal("close")},3e3),e.subForm.$setPristine();for(var o in e.subFormData)e.subFormData[o]="";e.issubFormSended=!0,setTimeout(function(){$(".j-popup-gratitude-sign").arcticmodal("close")},3e3)}))},e.showSignPopup=function(){e.isSignFormSended&&(e.isSignFormSended=!1),$(".j-popup-sign").arcticmodal()},r.get("http://www.kre.ru/landing/sale/").success(function(r){r.sort(n);for(var o=0;o<r.length;o+=1){var a=r[o];"city"==a.suptype?e.params.push({id:a.id,city:!0,rooms:parseInt(a.nb_rooms)?parseInt(a.nb_rooms)+" - ком. кв., ":" ",decoration:a.decoration||"",floor:parseInt(a.floor)?", "+(parseInt(a.floor)+"-й этаж"):"",head:a.estate,discount:parseFloat(a.discount),square:parseFloat(a.area),old_price:t(parseInt(a.old_price/1)),new_price:t(parseInt(a.new_price/1)),img:a.photo,link:a.link}):"country"==a.suptype?e.params.push({id:a.id,country:!0,desc:a.direction+" "+a.distance+" км от МКАД",head:a.estate,discount:parseFloat(a.discount),square:parseFloat(a.land_area)+" сот."||"",housearea:parseFloat(a.house_area)?", "+a.house_area+" м²":" ",old_price:t(parseInt(a.old_price)),new_price:t(parseInt(a.new_price)),img:a.photo,link:a.link}):"commerce"==a.suptype&&e.params.push({id:a.id,commerce:!0,desc:a.metro+" "+a.distance,head:a.address||a.name,discount:parseFloat(a.discount),square:parseFloat(a.area),old_price:t(parseInt(a.old_price/1)),new_price:t(parseInt(a.new_price/1)),img:a.photo,link:a.link}),e.filter=function(e,r){var o={};return angular.forEach(e,function(e,t){e[r]&&(o[t]=e)}),o},e.test=function(e){var r=0,o=document.querySelectorAll(".b-discount_inner"),t=document.querySelectorAll(".b-form");r=parseInt(o[e].children.length/2)%2?parseInt(o[e].children.length/2)+1:parseInt(o[e].children.length/2),o[e].children[r-1].insertAfter(t[e])}}})}]),e.directive("repeatEnd",function(){return{restrict:"A",link:function(e,r,o){e.$last&&e.$eval(o.repeatEnd)}}}),Element.prototype.insertAfter=function(e){return this.parentNode.insertBefore(e,this.nextSibling)}}(),$(window).scroll(function(){$(this).scrollTop()>540?($(".fixed-header").addClass("sticky"),$(".fixed-header").removeClass("hidden")):($(".fixed-header").removeClass("sticky"),$(".fixed-header").addClass("hidden"))});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiXSwibmFtZXMiOlsiJCIsIm9uIiwidGhpcyIsInBhcmVudCIsImFyY3RpY21vZGFsIiwiYXR0ciIsInR5cGUiLCJ2YWx1ZSIsImUiLCJpbkFycmF5Iiwia2V5Q29kZSIsImN0cmxLZXkiLCJtZXRhS2V5Iiwic2hpZnRLZXkiLCJwcmV2ZW50RGVmYXVsdCIsImV2ZW50Iiwic2Nyb2xsVG8iLCJkYXRhIiwiZHVyYXRpb24iLCJBcnJheSIsInByb3RvdHlwZSIsIm1heCIsIk1hdGgiLCJhcHBseSIsIm1pbiIsImFwcCIsImFuZ3VsYXIiLCJtb2R1bGUiLCJjb250cm9sbGVyIiwiJHNjb3BlIiwiJGh0dHAiLCIkaHR0cFBhcmFtU2VyaWFsaXplckpRTGlrZSIsImFkZFNwYWNlcyIsIm4iLCJyeCIsIlN0cmluZyIsInJlcGxhY2UiLCJ3IiwidGVzdCIsInNvcnQiLCJvYmoxIiwib2JqMiIsImRpc2NvdW50IiwiY2FsbGJhY2tGb3JtRGF0YSIsInNpZ25Gb3JtRGF0YSIsIm9yZGVyRm9ybURhdGEiLCJzdWJGb3JtRGF0YSIsImJhcmtsaUJyb2tlckZvcm1EYXRhIiwiaXNDYWxsYmFja0Zvcm1TZW5kZWQiLCJpc1NpZ25Gb3JtU2VuZGVkIiwiaXNzdWJGb3JtU2VuZGVkIiwiaXNPcmRlckZvcm1TZW5kZWQiLCJpc0JhcmtsaUJyb2tlckZvcm1TZW5kZWQiLCJjdXJyZW50VGFiIiwicGFyYW1zIiwiY291bnRyeSIsImNvbW1lcmMiLCJzaG93Q2FsbGJhY2tQb3B1cCIsInNlbmRDYWxsYmFja0Zvcm0iLCJjYWxsYmFja0Zvcm0iLCIkdmFsaWQiLCJtZXRob2QiLCJ1cmwiLCJoZWFkZXJzIiwiQ29udGVudC1UeXBlIiwic3VjY2VzcyIsIiRzZXRQcmlzdGluZSIsInByb3AiLCJzZXRUaW1lb3V0Iiwic2hvd1NpZ25Qb3B1cCIsInNlbmRTaWduRm9ybSIsInNpZ25Gb3JtIiwiY29uc29sZSIsImxvZyIsInNlbmRPcmRlckZvcm0iLCJvcmRlckZvcm0iLCJzZW5kU3ViRm9ybSIsInN1YkZvcm0iLCJnZXQiLCJpIiwibGVuZ3RoIiwiY3VycmVudEZsYXQiLCJzdXB0eXBlIiwicHVzaCIsImlkIiwiY2l0eSIsInJvb21zIiwicGFyc2VJbnQiLCJkZWNvcmF0aW9uIiwiZmxvb3IiLCJoZWFkIiwiZXN0YXRlIiwicGFyc2VGbG9hdCIsInNxdWFyZSIsImFyZWEiLCJvbGRfcHJpY2UiLCJuZXdfcHJpY2UiLCJpbWciLCJwaG90byIsImxpbmsiLCJkZXNjIiwiZGlyZWN0aW9uIiwiZGlzdGFuY2UiLCJob3VzZWFyZWEiLCJjb21tZXJjZSIsIm1ldHJvIiwiYWRkcmVzcyIsIm5hbWUiLCJmaWx0ZXIiLCJpdGVtcyIsInJlc3VsdCIsImZvckVhY2giLCJrZXkiLCJjdXJyZW50IiwiY2VudGVyIiwiYmxvY2tzIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yQWxsIiwiZm9ybXMiLCJjaGlsZHJlbiIsImluc2VydEFmdGVyIiwiZGlyZWN0aXZlIiwicmVzdHJpY3QiLCJzY29wZSIsImVsZW1lbnQiLCJhdHRycyIsIiRsYXN0IiwiJGV2YWwiLCJyZXBlYXRFbmQiLCJFbGVtZW50IiwiZWxlbSIsInBhcmVudE5vZGUiLCJpbnNlcnRCZWZvcmUiLCJuZXh0U2libGluZyIsIndpbmRvdyIsInNjcm9sbCIsInNjcm9sbFRvcCIsImFkZENsYXNzIiwicmVtb3ZlQ2xhc3MiXSwibWFwcGluZ3MiOiJDQUdBLFdBQ0ksWUFFQUEsR0FBRSxrQkFBa0JDLEdBQUcsUUFBUyxXQUM1QkQsRUFBRUUsTUFBTUMsU0FBU0MsWUFBWSxXQUdqQ0osRUFBRSxpQkFBaUJDLEdBQUcsVUFBVyxXQUM3QkQsRUFBRUUsTUFBTUcsTUFBTUMsS0FBTSxPQUFRQyxNQUFPLFlBQ3BDTixHQUFHLFdBQVksV0FDZEQsRUFBRUUsTUFBTUcsS0FBSyxPQUFRLFVBR3pCTCxFQUFFLG1CQUFtQkMsR0FBRyxVQUFXLFNBQVVPLEdBQ3JDUixFQUFFUyxRQUFRRCxFQUFFRSxTQUFVLEdBQUksRUFBRyxFQUFHLEdBQUks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QUFFLGlCQUFpQjBJLFlBQVksVUFDL0IxSSxFQUFFLGlCQUFpQnlJLFNBQVMiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IGx1emhpbi5kbSBvbiAxMS4wNy4yMDE2LlxyXG4gKi9cclxuKGZ1bmN0aW9uKCkge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgICQoJy5qLXBvcHVwLWNsb3NlJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICQodGhpcykucGFyZW50KCkuYXJjdGljbW9kYWwoJ2Nsb3NlJyk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAkKCcuai1pbnB1dC10aW1lJykub24oJ2ZvY3VzaW4nLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAkKHRoaXMpLmF0dHIoe3R5cGU6ICd0aW1lJywgdmFsdWU6ICcxMjowMCd9KTtcclxuICAgIH0pLm9uKCdmb2N1c291dCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICQodGhpcykuYXR0cigndHlwZScsICd0ZXh0Jyk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAkKCcuai1waG9uZS1tYXNrZWQnKS5vbigna2V5ZG93bicsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgaWYgKCQuaW5BcnJheShlLmtleUNvZGUsIFs0NiwgOCwgOSwgMjcsIDEzLCAxMTAsIDE5MF0pICE9PSAtMSB8fFxyXG4gICAgICAgICAgICAoZS5rZXlDb2RlID09IDY1ICYmICggZS5jdHJsS2V5ID09PSB0cnVlIHx8IGUubWV0YUtleSA9PT0gdHJ1ZSApICkgfHxcclxuICAgICAgICAgICAgKGUua2V5Q29kZSA+PSAzNSAmJiBlLmtleUNvZGUgPD0gNDApKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKChlLnNoaWZ0S2V5IHx8IChlLmtleUNvZGUgPCA0OCB8fCBlLmtleUNvZGUgPiA1NykpICYmIChlLmtleUNvZGUgPCA5NiB8fCBlLmtleUNvZGUgPiAxMDcpKSB7XHJcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuICAgICQoJy5qLXNjcm9sbHRvLWxpbmsnKS5vbignY2xpY2snLCBmdW5jdGlvbihldmVudCkge1xyXG4gICAgICAgICQuc2Nyb2xsVG8oXHJcbiAgICAgICAgICAgICQodGhpcykuZGF0YSgnc2Nyb2xsdG8tYmxvY2snKSxcclxuICAgICAgICAgICAge2R1cmF0aW9uOiA1MDB9XHJcbiAgICAgICAgKTtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9KTtcclxuXHJcbn0pKCk7XHJcbihmdW5jdGlvbigpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBBcnJheS5wcm90b3R5cGUubWF4ID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuIE1hdGgubWF4LmFwcGx5KG51bGwsIHRoaXMpO1xyXG4gICAgfTtcclxuXHJcbiAgICBBcnJheS5wcm90b3R5cGUubWluID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuIE1hdGgubWluLmFwcGx5KG51bGwsIHRoaXMpO1xyXG4gICAgfTtcclxuXHJcbiAgICB2YXIgYXBwID0gYW5ndWxhci5tb2R1bGUoJ21haW4nLCBbXSk7XHJcblxyXG4gICAgYXBwLmNvbnRyb2xsZXIoJ21haW5Db250cm9sbGVyJywgWyckc2NvcGUnLCAnJGh0dHAnLCAnJGh0dHBQYXJhbVNlcmlhbGl6ZXJKUUxpa2UnLCBmdW5jdGlvbigkc2NvcGUsICRodHRwLCAkaHR0cFBhcmFtU2VyaWFsaXplckpRTGlrZSkge1xyXG5cclxuICAgICAgICAkc2NvcGUuY2FsbGJhY2tGb3JtRGF0YSA9IHt9O1xyXG4gICAgICAgICRzY29wZS5zaWduRm9ybURhdGEgPSB7fTtcclxuICAgICAgICAkc2NvcGUub3JkZXJGb3JtRGF0YSA9IHt9O1xyXG4gICAgICAgICRzY29wZS5zdWJGb3JtRGF0YSA9IHt9XHJcbiAgICAgICAgJHNjb3BlLmJhcmtsaUJyb2tlckZvcm1EYXRhID0ge307XHJcbiAgICAgICAgJHNjb3BlLmlzQ2FsbGJhY2tGb3JtU2VuZGVkID0gZmFsc2U7XHJcbiAgICAgICAgJHNjb3BlLmlzU2lnbkZvcm1TZW5kZWQgPSBmYWxzZTtcclxuICAgICAgICAkc2NvcGUuaXNzdWJGb3JtU2VuZGVkID0gZmFsc2U7XHJcbiAgICAgICAgJHNjb3BlLmlzT3JkZXJGb3JtU2VuZGVkID0gZmFsc2U7XHJcbiAgICAgICAgJHNjb3BlLmlzQmFya2xpQnJva2VyRm9ybVNlbmRlZCA9IGZhbHNlO1xyXG4gICAgICAgICRzY29wZS5jdXJyZW50VGFiID0gMjtcclxuICAgICAgICAkc2NvcGUucGFyYW1zID0gW107XHJcbiAgICAgICAgJHNjb3BlLmNvdW50cnkgPSBbXTtcclxuICAgICAgICAkc2NvcGUuY29tbWVyYyA9IFtdO1xyXG5cclxuICAgICAgICAvKkNBTExCQUNLIFBPUFVQIFNUQVJUKi9cclxuXHJcbiAgICAgICAgJHNjb3BlLnNob3dDYWxsYmFja1BvcHVwID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGlmICgkc2NvcGUuaXNDYWxsYmFja0Zvcm1TZW5kZWQpICRzY29wZS5pc0NhbGxiYWNrRm9ybVNlbmRlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAkKCcuai1wb3B1cC1jYWxsYmFjaycpLmFyY3RpY21vZGFsKCk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgJHNjb3BlLnNlbmRDYWxsYmFja0Zvcm0gPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgaWYgKCRzY29wZS5jYWxsYmFja0Zvcm0uJHZhbGlkKSB7XHJcbiAgICAgICAgICAgICAgICAkc2NvcGUuY2FsbGJhY2tGb3JtRGF0YVsnc3ViamVjdCddID0gJ9CX0LDQutCw0LfQsNGC0Ywg0L7QsdGA0LDRgtC90YvQuSDQt9Cy0L7QvdC+0LouINCh0LrQuNC00LrQuC4nO1xyXG4gICAgICAgICAgICAgICAgJGh0dHAoe1xyXG4gICAgICAgICAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxyXG4gICAgICAgICAgICAgICAgICAgIHVybDogJy9zZW5kbWFpbC5waHAnLFxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6ICRodHRwUGFyYW1TZXJpYWxpemVySlFMaWtlKCRzY29wZS5jYWxsYmFja0Zvcm1EYXRhKSxcclxuICAgICAgICAgICAgICAgICAgICBoZWFkZXJzOiB7J0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnfVxyXG4gICAgICAgICAgICAgICAgfSkuc3VjY2VzcyhmdW5jdGlvbihkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmNhbGxiYWNrRm9ybS4kc2V0UHJpc3RpbmUoKTtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBwcm9wIGluICRzY29wZS5jYWxsYmFja0Zvcm1EYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRzY29wZS5jYWxsYmFja0Zvcm1EYXRhW3Byb3BdID0gJyc7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5pc0NhbGxiYWNrRm9ybVNlbmRlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJCgnLmotcG9wdXAtY2FsbGJhY2snKS5hcmN0aWNtb2RhbCgnY2xvc2UnKTtcclxuICAgICAgICAgICAgICAgICAgICB9LCAzMDAwKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICAvKkNBTExCQUNLIFBPUFVQIEVORCovXHJcblxyXG4gICAgICAgIC8qU0lHTiBQT1BVUCBTVEFSVCovXHJcbiAgICAgICAgJHNjb3BlLnNob3dTaWduUG9wdXAgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgaWYgKCRzY29wZS5pc1NpZ25Gb3JtU2VuZGVkKSAkc2NvcGUuaXNTaWduRm9ybVNlbmRlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAkKCcuai1wb3B1cC1ncmF0aXR1ZGUtc2lnbicpLmFyY3RpY21vZGFsKCk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgJHNjb3BlLnNlbmRTaWduRm9ybSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBpZiAoJHNjb3BlLnNpZ25Gb3JtLiR2YWxpZCkge1xyXG4gICAgICAgICAgICAgICAgJHNjb3BlLnNpZ25Gb3JtRGF0YVsnc3ViamVjdCddID0gJ9Cf0L7QtNC/0LjRgdC60LAg0L3QsCBEaXNjb3VudCc7XHJcbiAgICAgICAgICAgICAgICAkaHR0cCh7XHJcbiAgICAgICAgICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXHJcbiAgICAgICAgICAgICAgICAgICAgdXJsOiAnL3NlbmRtYWlsLnBocCcsXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogJGh0dHBQYXJhbVNlcmlhbGl6ZXJKUUxpa2UoJHNjb3BlLnNpZ25Gb3JtRGF0YSksXHJcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyczogeydDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJ31cclxuICAgICAgICAgICAgICAgIH0pLnN1Y2Nlc3MoZnVuY3Rpb24oZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5zaWduRm9ybS4kc2V0UHJpc3RpbmUoKTtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBwcm9wIGluICRzY29wZS5zaWduRm9ybURhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLnNpZ25Gb3JtRGF0YVtwcm9wXSA9ICcnO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAkc2NvcGUuaXNTaWduRm9ybVNlbmRlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJCgnLmotcG9wdXAtZ3JhdGl0dWRlLXNpZ24nKS5hcmN0aWNtb2RhbCgnY2xvc2UnKTtcclxuICAgICAgICAgICAgICAgICAgICB9LCAzMDAwKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCRzY29wZS5zaWduRm9ybSk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICAvKlNJR04gUE9QVVAgRU5EKi9cclxuXHJcbiAgICAgICAgLypSRVFVRVNUIEZPUk0gU0VORElORyBTVEFSVCovXHJcblxyXG4gICAgICAgICRzY29wZS5zZW5kT3JkZXJGb3JtID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGlmICgkc2NvcGUub3JkZXJGb3JtLiR2YWxpZCkge1xyXG4gICAgICAgICAgICAgICAgJHNjb3BlLm9yZGVyRm9ybURhdGFbJ3N1YmplY3QnXSA9ICfQl9Cw0LrQsNC30LDRgtGMINC+0LHRgNCw0YLQvdGL0Lkg0LfQstC+0L3QvtC6JztcclxuICAgICAgICAgICAgICAgICRodHRwKHtcclxuICAgICAgICAgICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcclxuICAgICAgICAgICAgICAgICAgICB1cmw6ICcvc2VuZG1haWwucGhwJyxcclxuICAgICAgICAgICAgICAgICAgICBkYXRhOiAkaHR0cFBhcmFtU2VyaWFsaXplckpRTGlrZSgkc2NvcGUub3JkZXJGb3JtRGF0YSksXHJcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyczogeydDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJ31cclxuICAgICAgICAgICAgICAgIH0pLnN1Y2Nlc3MoZnVuY3Rpb24oZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgICQoJy5qLXBvcHVwLWdyYXRpdHVkZS1yZXF1ZXN0JykuYXJjdGljbW9kYWwoKTtcclxuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKCcuai1wb3B1cC1ncmF0aXR1ZGUtcmVxdWVzdCcpLmFyY3RpY21vZGFsKCdjbG9zZScpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sIDMwMDApO1xyXG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5vcmRlckZvcm0uJHNldFByaXN0aW5lKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgcHJvcCBpbiAkc2NvcGUub3JkZXJGb3JtRGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUub3JkZXJGb3JtRGF0YVtwcm9wXSA9ICcnO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAkc2NvcGUuaXNPcmRlckZvcm1TZW5kZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQoJy5qLXBvcHVwLWdyYXRpdHVkZS1yZXF1ZXN0JykuYXJjdGljbW9kYWwoJ2Nsb3NlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSwgMzAwMCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgICRzY29wZS5zZW5kU3ViRm9ybSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBpZiAoJHNjb3BlLnN1YkZvcm0uJHZhbGlkKSB7XHJcbiAgICAgICAgICAgICAgICAkc2NvcGUuc3ViRm9ybURhdGFbJ3N1YmplY3QnXSA9ICfQn9C+0LTQv9C40YHQutCwINC90LAgRGlzY291bnQnO1xyXG4gICAgICAgICAgICAgICAgJGh0dHAoe1xyXG4gICAgICAgICAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxyXG4gICAgICAgICAgICAgICAgICAgIHVybDogJy9zZW5kbWFpbC5waHAnLFxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6ICRodHRwUGFyYW1TZXJpYWxpemVySlFMaWtlKCRzY29wZS5zdWJGb3JtRGF0YSksXHJcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyczogeydDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJ31cclxuICAgICAgICAgICAgICAgIH0pLnN1Y2Nlc3MoZnVuY3Rpb24oZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgICQoJy5qLXBvcHVwLWdyYXRpdHVkZS1zaWduJykuYXJjdGljbW9kYWwoKTtcclxuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKCcuai1wb3B1cC1ncmF0aXR1ZGUtc2lnbicpLmFyY3RpY21vZGFsKCdjbG9zZScpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sIDMwMDApO1xyXG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5zdWJGb3JtLiRzZXRQcmlzdGluZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIHByb3AgaW4gJHNjb3BlLnN1YkZvcm1EYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRzY29wZS5zdWJGb3JtRGF0YVtwcm9wXSA9ICcnO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAkc2NvcGUuaXNzdWJGb3JtU2VuZGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKCcuai1wb3B1cC1ncmF0aXR1ZGUtc2lnbicpLmFyY3RpY21vZGFsKCdjbG9zZScpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sIDMwMDApO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAkc2NvcGUuc2hvd1NpZ25Qb3B1cCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBpZiAoJHNjb3BlLmlzU2lnbkZvcm1TZW5kZWQpICRzY29wZS5pc1NpZ25Gb3JtU2VuZGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICQoJy5qLXBvcHVwLXNpZ24nKS5hcmN0aWNtb2RhbCgpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgZnVuY3Rpb24gYWRkU3BhY2VzKG4pIHtcclxuICAgICAgICAgICAgdmFyIHJ4ID0gLyhcXGQrKShcXGR7M30pLztcclxuICAgICAgICAgICAgcmV0dXJuIFN0cmluZyhuKVxyXG4gICAgICAgICAgICAgICAgLnJlcGxhY2UoL15cXGQrLywgZnVuY3Rpb24gKHcpIHtcclxuICAgICAgICAgICAgICAgICAgICB3aGlsZSAocngudGVzdCh3KSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB3ID0gdy5yZXBsYWNlKHJ4LCAnJDEgJDInKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHc7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZnVuY3Rpb24gc29ydChvYmoxLCBvYmoyKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBvYmoyLmRpc2NvdW50IC0gb2JqMS5kaXNjb3VudDtcclxuICAgICAgICB9XHJcbiAgICAgICAgJGh0dHAuZ2V0KCdodHRwOi8vd3d3LmtyZS5ydS9sYW5kaW5nL3NhbGUvJykuc3VjY2VzcyhmdW5jdGlvbihkYXRhKSB7XHJcbiAgICAgICAgICAgIGRhdGEuc29ydChzb3J0KTtcclxuICAgICAgICAgICAgZm9yICh2YXIgaT0wO2k8ZGF0YS5sZW5ndGg7IGkrPTEpIHtcclxuICAgICAgICAgICAgICAgIHZhciBjdXJyZW50RmxhdCA9IGRhdGFbaV07XHJcbiAgICAgICAgICAgICAgICBpZiAoY3VycmVudEZsYXQuc3VwdHlwZSA9PSAnY2l0eScpIHtcclxuICAgICAgICAgICAgICAgICAgICAkc2NvcGUucGFyYW1zLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZDogY3VycmVudEZsYXQuaWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNpdHk6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8qZGVzYzogKHBhcnNlSW50KGN1cnJlbnRGbGF0WyduYl9yb29tcyddKSsnIC0g0LrQvtC8LiDQutCyLiwgJytjdXJyZW50RmxhdC5kZWNvcmF0aW9uKycsICcrY3VycmVudEZsYXQuZmxvb3IrJy3QuSDRjdGC0LDQticpLCovXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJvb21zOiAocGFyc2VJbnQoY3VycmVudEZsYXRbJ25iX3Jvb21zJ10pKT8gKHBhcnNlSW50KGN1cnJlbnRGbGF0WyduYl9yb29tcyddKSsnIC0g0LrQvtC8LiDQutCyLiwgJykgOiAnICcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlY29yYXRpb246IGN1cnJlbnRGbGF0LmRlY29yYXRpb24gfHwgJycsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZsb29yOiAocGFyc2VJbnQoY3VycmVudEZsYXQuZmxvb3IpKT8gJywgJysocGFyc2VJbnQoY3VycmVudEZsYXQuZmxvb3IpICsgJy3QuSDRjdGC0LDQticpIDogJycsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlYWQ6IGN1cnJlbnRGbGF0LmVzdGF0ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGlzY291bnQ6IHBhcnNlRmxvYXQoY3VycmVudEZsYXQuZGlzY291bnQpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzcXVhcmU6IHBhcnNlRmxvYXQoY3VycmVudEZsYXQuYXJlYSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9sZF9wcmljZTogYWRkU3BhY2VzKHBhcnNlSW50KGN1cnJlbnRGbGF0WydvbGRfcHJpY2UnXS8xKSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ld19wcmljZTogYWRkU3BhY2VzKHBhcnNlSW50KGN1cnJlbnRGbGF0WyduZXdfcHJpY2UnXS8xKSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGltZzogY3VycmVudEZsYXQucGhvdG8sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxpbms6IGN1cnJlbnRGbGF0LmxpbmtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGN1cnJlbnRGbGF0LnN1cHR5cGUgPT0gJ2NvdW50cnknKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLnBhcmFtcy5wdXNoKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IGN1cnJlbnRGbGF0LmlkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb3VudHJ5OiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZXNjOiBjdXJyZW50RmxhdC5kaXJlY3Rpb24gKyAnICcgKyBjdXJyZW50RmxhdC5kaXN0YW5jZSsnINC60Lwg0L7RgiDQnNCa0JDQlCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlYWQ6IGN1cnJlbnRGbGF0LmVzdGF0ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGlzY291bnQ6IHBhcnNlRmxvYXQoY3VycmVudEZsYXQuZGlzY291bnQpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzcXVhcmU6IHBhcnNlRmxvYXQoY3VycmVudEZsYXRbJ2xhbmRfYXJlYSddKSsnINGB0L7Rgi4nIHx8ICcnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBob3VzZWFyZWE6IChwYXJzZUZsb2F0KGN1cnJlbnRGbGF0Wydob3VzZV9hcmVhJ10pKT8gJywgJytjdXJyZW50RmxhdFsnaG91c2VfYXJlYSddKycg0LzCsic6ICcgJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgb2xkX3ByaWNlOiBhZGRTcGFjZXMocGFyc2VJbnQoY3VycmVudEZsYXRbJ29sZF9wcmljZSddKSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ld19wcmljZTogYWRkU3BhY2VzKHBhcnNlSW50KGN1cnJlbnRGbGF0WyduZXdfcHJpY2UnXSkpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbWc6IGN1cnJlbnRGbGF0LnBob3RvLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsaW5rOiBjdXJyZW50RmxhdC5saW5rXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmIChjdXJyZW50RmxhdC5zdXB0eXBlID09ICdjb21tZXJjZScpIHtcclxuICAgICAgICAgICAgICAgICAgICAkc2NvcGUucGFyYW1zLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZDogY3VycmVudEZsYXQuaWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbW1lcmNlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZXNjOiBjdXJyZW50RmxhdC5tZXRybysgJyAnICsgY3VycmVudEZsYXQuZGlzdGFuY2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlYWQ6IGN1cnJlbnRGbGF0LmFkZHJlc3MgfHwgY3VycmVudEZsYXQubmFtZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGlzY291bnQ6IHBhcnNlRmxvYXQoY3VycmVudEZsYXQuZGlzY291bnQpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzcXVhcmU6IHBhcnNlRmxvYXQoY3VycmVudEZsYXQuYXJlYSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9sZF9wcmljZTogYWRkU3BhY2VzKHBhcnNlSW50KGN1cnJlbnRGbGF0WydvbGRfcHJpY2UnXS8xKSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ld19wcmljZTogYWRkU3BhY2VzKHBhcnNlSW50KGN1cnJlbnRGbGF0WyduZXdfcHJpY2UnXS8xKSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGltZzogY3VycmVudEZsYXQucGhvdG8sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxpbms6IGN1cnJlbnRGbGF0LmxpbmtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICRzY29wZS5maWx0ZXIgPSBmdW5jdGlvbihpdGVtcywgYXR0cikge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciByZXN1bHQgPSB7fTtcclxuICAgICAgICAgICAgICAgICAgICBhbmd1bGFyLmZvckVhY2goaXRlbXMsIGZ1bmN0aW9uKHZhbHVlLCBrZXkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHZhbHVlW2F0dHJdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHRba2V5XSA9IHZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAkc2NvcGUudGVzdCA9IGZ1bmN0aW9uKGN1cnJlbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgY2VudGVyID0gMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgYmxvY2tzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmItZGlzY291bnRfaW5uZXInKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9ybXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuYi1mb3JtJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChwYXJzZUludChibG9ja3NbY3VycmVudF0uY2hpbGRyZW4ubGVuZ3RoLzIpJTIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2VudGVyID0gcGFyc2VJbnQoYmxvY2tzW2N1cnJlbnRdLmNoaWxkcmVuLmxlbmd0aCAvIDIpICsgMTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNlbnRlciA9IHBhcnNlSW50KGJsb2Nrc1tjdXJyZW50XS5jaGlsZHJlbi5sZW5ndGgvMik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGJsb2Nrc1tjdXJyZW50XS5jaGlsZHJlbltjZW50ZXItMV0uaW5zZXJ0QWZ0ZXIoZm9ybXNbY3VycmVudF0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XSk7XHJcbiAgICBhcHAuZGlyZWN0aXZlKFwicmVwZWF0RW5kXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICByZXN0cmljdDogXCJBXCIsXHJcbiAgICAgICAgICAgIGxpbms6IGZ1bmN0aW9uIChzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcclxuICAgICAgICAgICAgICAgIGlmIChzY29wZS4kbGFzdCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNjb3BlLiRldmFsKGF0dHJzLnJlcGVhdEVuZCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgfSk7XHJcbiAgICBFbGVtZW50LnByb3RvdHlwZS5pbnNlcnRBZnRlciA9IGZ1bmN0aW9uKGVsZW0pIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5wYXJlbnROb2RlLmluc2VydEJlZm9yZShlbGVtLCB0aGlzLm5leHRTaWJsaW5nKTtcclxuICAgIH07XHJcbn0pKCk7XHJcbi8qKlxyXG4gKiBDcmVhdGVkIGJ5IGx1emhpbi5kbSBvbiAxMS4wNy4yMDE2LlxyXG4gKi9cclxuJCh3aW5kb3cpLnNjcm9sbChmdW5jdGlvbiAoKXtcclxuXHRpZigkKHRoaXMpLnNjcm9sbFRvcCgpID4gNTQwKSB7XHJcblx0XHQkKFwiLmZpeGVkLWhlYWRlclwiKS5hZGRDbGFzcygnc3RpY2t5Jyk7XHJcblx0XHQkKFwiLmZpeGVkLWhlYWRlclwiKS5yZW1vdmVDbGFzcygnaGlkZGVuJyk7XHJcblx0fSBlbHNlIHtcclxuXHRcdCQoXCIuZml4ZWQtaGVhZGVyXCIpLnJlbW92ZUNsYXNzKCdzdGlja3knKTtcclxuXHRcdCQoXCIuZml4ZWQtaGVhZGVyXCIpLmFkZENsYXNzKCdoaWRkZW4nKTtcclxuXHR9XHJcbn0pOyJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
