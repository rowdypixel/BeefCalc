$(document).ready(function() {

  $('input#calculate-button').click(function() {
      var leastLean = getRealPrice(73, $('#73-27-price').val())
      var middleLean = getRealPrice(80, $('#80-20-price').val())
      var mostLean = getRealPrice(85, $('#85-15-price').val())

      var lowest = Math.min(leastLean, middleLean, mostLean);

      if(lowest == leastLean) {
        $('#results').html('73/27');
      }
      else if(lowest == middleLean) {
          $('#results').html('80/20');
        }
      else if(lowest == mostLean) {
          $('#results').html('85/15');
      }
  });


  function getRealPrice(percentLean, price) {
    var leanAsRealPercent = ( percentLean/ 100);
      var realPrice = price / leanAsRealPercent;

      console.log(percentLean, '-', realPrice)
      return realPrice;
  }
})
