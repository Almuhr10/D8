    //English Date
    
    $(document).ready(function() {
      $('#date-picker-month-gregorian').select2();
      $('#date-picker-year-gregorian').select2();
    });
    
    
//News

 
var perPage = 6;
    var options = {
      valueNames: ['title', 'year1', 'month1'],
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
    
    $('#year').change(function() {      
      var selection = parseInt($(this).val());
      
      if (selection) {
        var count1 = 0;
        userList.update().filter(function(item) {
          if($('#month').val()){
            
            if (item.values().year1 == selection && item.values().month1 == $('#month').val() ){
              count1++;
            }
          }else if (item.values().year1 == selection){
              count1++;
          }
          if($('#month').val()){
            
            return (item.values().year1 == selection && item.values().month1 == $('#month').val() );
          } else {
            return (item.values().year1 == selection);
          }
          
          
        });
        
        if (count1 > 0){
            $('.not-found').css('display', 'none');
            $('.pagination').css('visibility', 'visible');
          } else {
            $('.not-found').css('display', 'block');
            $('.pagination').css('visibility', 'hidden');
          }
        
      } 
    });

    $('#month').change(function() {
      var selection = $(this).val();
      
      if (selection) {
        var count1 = 0;
        userList.update().filter(function(item) {
          if($('#year').val()){
            
            if (item.values().month1 == selection && item.values().year1 == parseInt($('#year').val()) ){
              count1++;
            }
          }else if (item.values().month1 == selection){
              count1++;
          }
          if($('#year').val()){
            console.log( parseInt($('#year').val()) );
            return (item.values().month1 == selection && item.values().year1 == parseInt($('#year').val()) );
          } else {
            return (item.values().month1 == selection);
          }
        });
        
        if (count1 > 0){
            $('.not-found').css('display', 'none');
            $('.pagination').css('visibility', 'visible');
          } else {
            $('.not-found').css('display', 'block');
            $('.pagination').css('visibility', 'hidden');
          }
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
  document.getElementById('select2-month-container').innerHTML= "Search/Choose the month";
  document.getElementById('select2-year-container').innerHTML= "Search/Choose the year";
  $('.not-found').css('display', 'none');
  $('.pagination').css('visibility', 'visible');
  userList.filter();
  userList.search();
}
 $(document).ready(function() {
      $('.news-filter').select2();
    });
  