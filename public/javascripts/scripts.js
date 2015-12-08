$(document).ready(function() {
  console.log('working');

  //clicking submit on appy page submits application
  $('form#apply').on('submit', function(event) {
    try {
      event.preventDefault();
      console.log('submit works');

      var data = $(this).serializeArray();
      console.log(data);
      data.forEach(function(elem){
        if(elem.value != '') {
          data[elem.name] = elem.value;
        }
      });

      $.ajax({
        method: 'POST',
        url: '/apply',
        data: data
      }).done(function(){
        alert('Thanks for your submission!');
      });

    } catch (exception) {
      console.log(exception);
    }

  });

  // Clicking search button on Admin page returns search results
  $('#search').on('click', function(event) {
    try {
      $.ajax({
        method: 'GET',
        url: '/admin/search/' + $('#searchbox').val()
      }).done(function(data){
        console.log('button works');
        console.log(data);
      });
    } catch (exception) {
      console.log(exception);
    }
  })

});