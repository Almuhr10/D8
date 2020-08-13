     $(document).ready(function(){
            $('#mediacenter-en').lightGallery({
              selector: '.item',
               thumbnail:true
});
            
    
        });
    

// Multimedia Functions

    var perPage = 9;
    var options = {
      valueNames: ['tag'],
      page: perPage,
      pagination: [{
        name: "pagination-layout",
        paginationClass: "pagination-layout",
        innerWindow: 1,
        left: 5,
        right: 1
      }]
    };

    var userList = new List('multimedia-ar', options);

    $(".all").click(function(event) {
      event.preventDefault();
      userList.search();
      $(".all").addClass("active");
      $(".videos1").removeClass("active");
      $(".photos1").removeClass("active");
      $(".infographics1").removeClass("active");
    });

    $(".videos1").click(function(event) {
      event.preventDefault();
      userList.search("فيديو");
      $(".videos1").addClass("active");
      $(".all").removeClass("active");
      $(".photos1").removeClass("active");
      $(".infographics1").removeClass("active");
    });

    $(".photos1").click(function(event) {
      event.preventDefault();
      userList.search("صورة");
      $(".photos1").addClass("active");
      $(".all").removeClass("active");
      $(".videos1").removeClass("active");
      $(".infographics1").removeClass("active");
    });

    $(".infographics1").click(function(event) {
      event.preventDefault();
      userList.search("انفوجرافيك");
      $(".infographics1").addClass("active");
      $(".all").removeClass("active");
      $(".photos1").removeClass("active");
      $(".videos1").removeClass("active");
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

    $(document).ready(function() {
      $('#multimedia-ar').lightGallery({
        selector: '.item',
        thumbnail: true
      });

    });
 
