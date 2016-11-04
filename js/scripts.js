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
  var sizeInput = 0;
  var crustInput = 0;
  var myPizza, myCustomer,numberOfPies, size, notes;

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
    } else if (crustInput == 0){
      alert("Please select a style of crust")
    }  else{
      myPizza = new PizzaOrder(sizeInput, crustInput, toppingArray, notes, numberOfPies);//creates pizza object
      $("#place-order").hide();
      $("#review-order").slideDown();
      $(".pizza-size").append(myPizza.size + " ");
      $(".pizza-crust").append(myPizza.crust + " ");
      $(".customer-toppings").text(myPizza.toppings);
      $(".price").text("Price: $" + myPizza.price(myPizza));
    }
  });

  $(".place-order").click(function(){
    var deliverInput = $("#delivery").val();
    if (deliverInput ===  "Delivery"){$("#deliver-input").show();
    debugger;

    } else {
    $("#review-order").hide();
    $("#order-over").slideDown();
    $(".pizza-size2").append(myPizza.size + " ");
    $(".pizza-crust2").append(myPizza.crust + " ");
    $(".customer-toppings2").append(", with " +myPizza.toppings);
    $("which-one").append(" will be ready in 30 minutes!");
    }
  });
  $("#confirm").click(function(event){
    event.preventDefault();
    var nameInput = $(".cust-name").val();
    var addInput = $(".cust-add").val();
    var phoneInput = $(".cust-phone").val();
    myCustomer = new Customer(nameInput, addInput, phoneInput);
    $("#deliver-input").hide();
    $("#review-order").hide();
    $("#order-over").slideDown();
    $(".customer-name").append(myCustomer.name)
    $(".pizza-crust2").append(myPizza.crust + " ");
    $(".pizza-size2").append(myPizza.size + " ");
    $(".customer-toppings2").append(", with " +myPizza.toppings);
    $("#which-one").append(" will be delivered within 45 minutes!")
  });

  $(".change-order").click(function(){
    toppingArray = [];
    $("#place-order").slideDown();
    $("#review-order").hide();
    $("#deliver-input").hide();

  });


});
