$(document).ready(function() {
  console.log('working');

  $('form').on('submit', function(event) {
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
      console.log(exception)
    }

  });

});