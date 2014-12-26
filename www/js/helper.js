<script>
// Cache selectors
var lastId,
    topMenu = $("#navigation"),
    topMenuHeight = topMenu.outerHeight()-15,
    // All list items
    menuItems = topMenu.find("a"),
    // Anchors corresponding to menu items
    scrollItems = menuItems.map(function(){
      var item = $($(this).attr("href"));
      if (item.length) { return item; }
    });

menuItems.click(function(e){
  var href = $(this).attr("href"),
      offsetTop = href === "#" ? 0 : $(href).offset().top-topMenuHeight-50;
  $('html, body').stop().animate({ 
      scrollTop: offsetTop
  }, 300);
  e.preventDefault();
});



// Bind to scroll
$(window).scroll(function(){
  console.log("hello moving");
     if($(document).scrollTop()>30){
        $("header").removeClass("large").addClass("small");
    } else{
        $("header").removeClass("small").addClass("large");
    }
   // Get container scroll position
   var fromTop = $(this).scrollTop()+topMenuHeight -120;
   
   // Get id of current scroll item
   var cur = scrollItems.map(function(){
     if ($(this).offset().top > fromTop)
       return this;
   });
   // Get the id of the current element
   cur = cur[cur.length-1];
   var id = cur && cur.length ? cur[0].id : "";
   
   if (lastId !== id) {
       lastId = id;
       // Set/remove active class
       menuItems
         .parent().removeClass("ACTIVE")
         .end().filter("[href=#"+id+"]").parent().addClass("ACTIVE");
   }                
});

    $(function(){
        $('#top-menu').data('size','big');
    });

/*-----------Make The Home Page Become active at the time loading the page*/
jQuery( document ).ready( function ( $ ) {
    // Add first and last menu item classes
   
    $('ul#navigation li:last-child').addClass( 'ACTIVE' );
});

</script>