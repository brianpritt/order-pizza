function PizzaOrder(size, toppings, note, number ){
  this.size=size;
  this.toppings= toppings;
  this.note=note;
  this.number=number;
}

var toppingsVeg=["tomatoes","olives","onions","bell peppers","mushrooms"]
var toppingsMeat=["Sausage","ham","peperoni","anchovies"]

PizzaOrder.prototype.price = function(myPizza){
  var price = 0;
  var toppingPrice;
  if (myPizza.size === "Small"){price += 8}
  else if (myPizza.size === "Medium"){price += 10}
  else if (myPizza.size === "Large"){price += 12}
  else if (myPizza.size === "Xtra-large"){price += 14}
  toppingPrice = (myPizza.toppings.length) *.5;
  price += toppingPrice;
  return price;
}

$(document).ready(function(){

  var toppingArray = [];
  var size;
  var sizeInput = 0;
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
    if (sizeInput == 0){
      alert("Please select a size");
    } else{
      var myPizza = new PizzaOrder(sizeInput, toppingArray, notes, numberOfPies);//creates pizza object
      $("#place-order").hide();
      $("#review-order").slideDown();
      $(".customer-order").text(myPizza.size);
      $(".price").text(myPizza.price(myPizza));
    }
  });
  $("#place-order").click(function(){
    $("review-order").hide();

  });
});
