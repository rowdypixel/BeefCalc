$(document).ready(function() {

  $('input#calculate-button').click(function() {

    var prices = [];

    $('input.beef-price').each(function() {
      var leanPercent = $(this).attr('data-lean-percent');
      var totalPrice = $(this).val();

      if(totalPrice > 0) {
        var value = getRealPrice(leanPercent, totalPrice);
        prices.push({ percent: leanPercent, price: value});
      }
    })

    prices.sort(function(a,b) {
       if(a.price < b.price) return -1;
       if (a.price > b.price) return 1;
       if(a.price == b.price) return 0;
    });


    $('#results #cheapest').html(prices[0].percent + '% beef - $' + prices[0].price + '/lb');

    prices.forEach(function(price) {
        $('#results #all').append('<li>' + price.percent + '% beef: $' + price.price + '/lb</li>');
    })
  });

  function getRealPrice(percentLean, price) {
    var leanAsRealPercent = ( percentLean/ 100);
      var realPrice = price / leanAsRealPercent;
      return Math.round(realPrice * 100) / 100;
  }
})
