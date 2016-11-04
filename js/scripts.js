function PizzaOrder(size, crust, toppings, note, number ){
  this.size=size;
  this.crust=crust;
  this.toppings= toppings;
  this.note=note;
  this.number=number;
}
//one global variable.  Price!!!
var price = 0;

var toppingsVeg=["tomatoes","olives","onions","bell peppers","mushrooms"]
var toppingsMeat=["Sausage","ham","peperoni","anchovies"]

PizzaOrder.prototype.price = function(myPizza){
  var toppingPrice;
  if (myPizza.size === "Small"){price += 8}
  else if (myPizza.size === "Medium"){price += 10}
  else if (myPizza.size === "Large"){price += 12}
  else if (myPizza.size === "Xtra-large"){price += 14}

  if (myPizza.crust === "Stuffed Crust"){price += 2}

  toppingPrice = (myPizza.toppings.length) *.5;
  price += toppingPrice;
  return price;
}

$(document).ready(function(){//document.ready

  var toppingArray = [];
  var size;
  var sizeInput = 0;
  var crustInput = 0;
  var notes;
  var numberOfPies;

  $("#welcome .startOrder").click(function(){//starts the pizza order
    $("#place-order").slideDown();
    $("#welcome").hide();
  });

  $("form#toppings").submit(function(event){//submits the order for review
    event.preventDefault();
    $("input:checkbox[name=topping]:checked").each(function(){//puts toppings into an array
      var topping = $(this).val();
      toppingArray.push(topping);
    });
      sizeInput = $("#size").val();
      crustInput = $("#crust").val();
    if (sizeInput == 0){
      alert("Please select a size");
    } else{
      var myPizza = new PizzaOrder(sizeInput, crustInput, toppingArray, notes, numberOfPies);//creates pizza object
      $("#place-order").hide();
      $("#review-order").slideDown();
      $(".customer-toppings").text(myPizza.toppings);
      $(".price").text("Price: $" + myPizza.price(myPizza));
    }
  });

  $(".place-order").click(function(){
    var deliverInput = $("#delivery").val();
    if (deliverInput === "Delivery"){$("#deliver-input").show();}
    else {
    $("review-order").hide();
    }
  });

  $(".confirm").submit(function(){
      $(".review-order").hide();
      $("#order-placed").show();
  });

  $(".change-order").click(function(){
    toppingArray = [];
    $("#place-order").slideDown();
    $("#review-order").hide();
  });
});
