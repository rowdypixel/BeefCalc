$(document).ready(function() {

  addBeef(73, 3.50);
  addBeef(80, 4.49);
  addBeef(85, 5.99);

  $('button#save-new-beef-button').click(function(){
    var lean = $('input#new-lean-percent').val();
    var price = $('input#new-beef-price').val();


    var valid = true;
    if(!isNumeric(lean)) {
      $('#new-leanness-group').addClass('has-warning');
      valid = false;
    }
    if(!isNumeric(price)) {
      $('#new-price-group').addClass('has-warning');
      valid = false;
    }
    if(!valid)
    {
      $('.modal .alert').removeClass('hidden');
      return;
    }

    addBeef(lean, price);


    // Close the modal and reset.
    $('.modal').modal('hide');
    $('input#new-lean-percent').val('');
    $('input#new-beef-price').val('');
});

  $('input#calculate-button').click(function() {

    $('#results #all').html('');
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

    $('.slide').addClass('hidden');
    $('#results-slide').removeClass('hidden');
  });


  $('input#start-button').click(function() {
    $('.slide').addClass('hidden');
    $('#calculator-slide').removeClass('hidden');
  });

  function getRealPrice(percentLean, price) {
    var leanAsRealPercent = ( percentLean/ 100);
      var realPrice = price / leanAsRealPercent;
      return Math.round(realPrice * 100) / 100;
  }

  function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }

  function addBeef(lean, price) {


    price = parseFloat(Math.round(price * 100) / 100).toFixed(2); //Always show as 1.00

    $(this).attr("data-dismiss", 'modal');
    var tpl ='<div class="form-group spacing-top-small">\
      <label>##LEAN##% lean</label>\
      <div class="input-group">\
        <span class="input-group-addon">$</span><input class="form-control beef-price" data-lean-percent="##LEAN##" type="text" value="##PRICE##"><span class="input-group-addon">/lb</span>\
      </div>\
      <button class="btn btn-danger delete-beef-button">&times;</button>\
    </div>';


    var final = tpl.replace(/##LEAN##/g, lean);
    final = final.replace(/##PRICE##/g, price);


    $('#beefs').append(final);

    // Set the click handlers for all the delete buttons again.
    $('button.delete-beef-button').click(function(e){
      e.preventDefault();
      $(this).parents('.form-group').remove();
    });

  }
});
