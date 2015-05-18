$(document).ready(function() {

  $('input#calculate-button').click(function() {
      var leastLean = getRealPrice(73, $('#73-27-price').val())
      var middleLean = getRealPrice(73, $('#80-20-price').val())
      var mostLean = getRealPrice(73, $('#85-15-price').val())

      var array = [leastLean, middleLean, mostLean];
      array.sort();

      if(array[0] == leastLean)
        $('#results').html('73/27');
      if(array[0] == middleLean)
          $('#results').html('80/20');
      if(array[0] == mostLean)
          $('#results').html('85/15');
  });


  function getRealPrice(percentLean, price) {

  }
})
