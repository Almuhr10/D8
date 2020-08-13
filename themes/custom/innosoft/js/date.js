 // Arabic Calender

$(document).ready(function() {
      $('#date-picker-month-gregorian').select2({
        dir: "rtl"
      });
      $('#date-picker-year-gregorian').select2({
        dir: "rtl"
      });
    });


  
//   publications Functions  
var perPage = 9;
    var options = {
      valueNames: ['title'],
      page: perPage,
      pagination: [{
        name: "pagination-layout",
        paginationClass: "pagination-layout",
        innerWindow: 1,
        left: 5,
        right: 1
      }]
    };

    var userList = new List('news1', options);
    
    $('#search-text').on('keyup', function() {
      
        if (userList.update().matchingItems.length > 0){
            $('.not-found').css('display', 'none');
            $('.pagination').css('visibility', 'visible');
          } else {
            $('.not-found').css('display', 'block');
            $('.pagination').css('visibility', 'hidden');
          }
    });
    
    // PAGINATION PAGER CONTROLS
    userList.on("updated", function(list) {
  var isFirst = list.i == 1;
  var isLast = list.i > list.matchingItems.length - list.page;

  // make the Prev and Nex buttons disabled on first and last pages accordingly
  $(".pagination-prev.disabled, .pagination-next.disabled").removeClass(
    "disabled"
  );
  if (isFirst) {
    $(".pagination-prev").addClass("disabled");
  }
  if (isLast) {
    $(".pagination-next").addClass("disabled");
  }

  // hide pagination if there one or less pages to show
  if (list.matchingItems.length <= perPage) {
    $(".pagination").hide();
  } else {
    $(".pagination").show();
  }
});
    
     // hide pagination if there one or less pages to show
  if (userList.matchingItems.length <= perPage) {
    $(".pagination").hide();
  } else {
    $(".pagination").show();
  }

$(".pagination-next").click(function(event) {
  event.preventDefault();
  $(".pagination-layout .active")
    .next()
    .trigger("click");
});
$(".pagination-prev").click(function(event) {
  event.preventDefault();
  $(".pagination-layout .active")
    .prev()
    .trigger("click");
});


  

function resetFun() {
  document.getElementById('search-text').value= "";
  $('.not-found').css('display', 'none');
  $('.pagination').css('visibility', 'visible');
  userList.filter();
  userList.search();
}
 
  
    