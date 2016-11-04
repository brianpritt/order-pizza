//BUSINESS
function PizzaOrder(size, crust, toppings, note, number ){
  this.size=size;
  this.crust=crust;
  this.toppings= toppings;
  this.note=note;
  this.number=number;
}
function Customer(name, address, phone){
  this.name=name;
  this.address=address;
  this.phone=phone;
}
//one global variable.  Price!!!
var price = 0;
//price prototype
PizzaOrder.prototype.pizzaPrice = function(myPizza){
  var toppingPrice;
  if (myPizza.size === "Small"){price += 8}
  else if (myPizza.size === "Medium"){price += 10}
  else if (myPizza.size === "Large"){price += 12}
  else if (myPizza.size === "Xtra-large"){price += 14}

  if (myPizza.crust === "Stuffed Crust"){price += 2}

  toppingPrice = (myPizza.toppings.length) *.50;
  price += toppingPrice;
  return price;
}

//Front End
$(document).ready(function(){//document.ready

  var toppingArray = [];
  var sizeInput = 0;
  var crustInput = 0;
  var myPizza, myCustomer,numberOfPies, size, notes;

  $("#welcome .startOrder").click(function(){//starts the pizza order
    $("#place-order").slideDown();
    $("#welcome").hide();
    $(".carousel").hide();
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
    } else if (crustInput == 0){
      alert("Please select a style of crust")
    }  else{
      myPizza = new PizzaOrder(sizeInput, crustInput, toppingArray, notes, numberOfPies);//creates pizza object

      $("#place-order").hide();
      $("#review-order").slideDown();

      $(".pizza-size").append(myPizza.size + " ");
      $(".pizza-crust").append(myPizza.crust + " ");
      $(".customer-toppings").text(myPizza.toppings);
      $(".price").text("Price: $" + myPizza.pizzaPrice(myPizza));
    }
  });

  $(".place-order").click(function(){//check if customer wants delivery
    var deliverInput = $("#delivery").val();
    if (deliverInput ===  "Delivery"){$("#deliver-input").show();

  } else {//output for pick up
      $("#review-order").hide();
      $("#order-over").slideDown();

      $(".pizza-size2").append(myPizza.size + " ");
      $(".pizza-crust2").append(myPizza.crust + " ");
      $(".customer-toppings2").append("  " +myPizza.toppings);
      $(".which-one").append(" will be ready in 30 minutes!");
      $(".carousel").slideDown();
    }
  });
  $("#confirm").click(function(event){//delivery address confirmation  & output to screen
    event.preventDefault();
    var nameInput = $(".cust-name").val();
    var addInput = $(".cust-add").val();
    var phoneInput = $(".cust-phone").val();

    myCustomer = new Customer(nameInput, addInput, phoneInput); //makes customer profile

    $("#deliver-input").hide();
    $("#review-order").hide();
    $("#order-over").slideDown();
    $(".carousel").slideDown();
    $(".customer-name").append(myCustomer.name)
    $(".pizza-crust2").append(myPizza.crust + " ");
    $(".pizza-size2").append(myPizza.size + " ");
    $(".customer-toppings2").append(",  " +myPizza.toppings);
    $(".which-one").append(" will be delivered within 45 minutes!")
  });

  $(".change-order").click(function(){//go back and change order after user previews
    toppingArray = [];
    $("#place-order").slideDown();
    $("#review-order").hide();
    $("#deliver-input").hide();

  });
  $(".done").click(function(){
    $("#order-over").hide();
    $("#welcome").show();
  });


});
