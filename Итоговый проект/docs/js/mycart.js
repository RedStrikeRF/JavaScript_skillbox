(function ($) {

  "use strict";

  let OptionManager = (function () {
    let objToReturn = {};

    let defaultOptions = {
      classCartIcon: 'my-cart-icon',
      classCartBadge: 'my-cart-badge',
      affixCartIcon: true,
      checkoutCart: function(products) { },
      clickOnAddToCart: function($addTocart) { },
      getDiscountPrice: function(products) { return null; }
    };


    let getOptions = function (customOptions) {
      let options = $.extend({}, defaultOptions);
      if (typeof customOptions === 'object') {
        $.extend(options, customOptions);
      }
      return options;
    }

    objToReturn.getOptions = getOptions;
    return objToReturn;
  }());


  let ProductManager = (function (){
    let objToReturn = {};

    
    localStorage.products = localStorage.products ? localStorage.products : "";
    let getIndexOfProduct = function(id){
      let productIndex = -1;
      let products = getAllProducts();
      $.each(products, function(index, value){
        if(value.id == id){
          productIndex = index;
          return;
        }
      });
      return productIndex;
    }
    let setAllProducts = function(products){
      localStorage.products = JSON.stringify(products);
    }
    let addProduct = function(id, name, summary, price, quantity, image) {
      let products = getAllProducts();
      products.push({
        id: id,
        name: name,
        summary: summary,
        price: price,
        quantity: quantity,
        image: image
      });
      setAllProducts(products);
    }

    /*
    PUBLIC
    */
    let getAllProducts = function(){
      try {
        let products = JSON.parse(localStorage.products);
        return products;
      } catch (e) {
        return [];
      }
    }
    let updatePoduct = function(id, quantity) {
      let productIndex = getIndexOfProduct(id);
      if(productIndex < 0){
        return false;
      }
      let products = getAllProducts();
      products[productIndex].quantity = typeof quantity === "undefined" ? products[productIndex].quantity * 1 + 1 : quantity;
      setAllProducts(products);
      return true;
    }
    let setProduct = function(id, name, summary, price, quantity, image) {
      if(typeof id === "undefined"){
        console.error("id required")
        return false;
      }
      if(typeof name === "undefined"){
        console.error("name required")
        return false;
      }
      if(typeof image === "undefined"){
        console.error("image required")
        return false;
      }
      if(!$.isNumeric(price)){
        console.error("price is not a number")
        return false;
      }
      if(!$.isNumeric(quantity)) {
        console.error("quantity is not a number");
        return false;
      }
      summary = typeof summary === "undefined" ? "" : summary;

      if(!updatePoduct(id)){
        addProduct(id, name, summary, price, quantity, image);
      }
    }
    let clearProduct = function(){
      setAllProducts([]);
    }
    let removeProduct = function(id){
      let products = getAllProducts();
      products = $.grep(products, function(value, index) {
        return value.id != id;
      });
      setAllProducts(products);
    }
    let getTotalQuantityOfProduct = function(){
      let total = 0;
      let products = getAllProducts();
      $.each(products, function(index, value){
        total += value.quantity * 1;
      });
      return total;
    }

    objToReturn.getAllProducts = getAllProducts;
    objToReturn.updatePoduct = updatePoduct;
    objToReturn.setProduct = setProduct;
    objToReturn.clearProduct = clearProduct;
    objToReturn.removeProduct = removeProduct;
    objToReturn.getTotalQuantityOfProduct = getTotalQuantityOfProduct;
    return objToReturn;
  }());


  let loadMyCartEvent = function(userOptions){

    let options = OptionManager.getOptions(userOptions);
    let $cartIcon = $("." + options.classCartIcon);
    let $cartBadge = $("." + options.classCartBadge);

    let idCartModal = 'my-cart-modal';
    let idCartTable = 'my-cart-table';
    let classProductQuantity = 'my-product-quantity';
    let classProductTotal = 'my-product-total';
    let idGrandTotal = 'my-cart-grand-total';
    let idCheckoutCart = 'checkout-my-cart';
    let classProductRemove = 'my-product-remove';
    let idEmptyCartMessage = 'my-cart-empty-message';
    let classAffixMyCartIcon = 'my-cart-icon-affix';
    let idDiscountPrice = 'my-cart-discount-price';

    $cartBadge.text(ProductManager.getTotalQuantityOfProduct());

    if(!$("#" + idCartModal).length) {
      $('body').append(
        '<div class="modal fade" id="' + idCartModal + '" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">' +
        '<div class="modal-dialog" role="document">' +
        '<div class="modal-content">' +
        '<div class="modal-header">' +
        '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>' +
        '<h5 class="modal-title" id="myModalLabel"> &nbsp; My Cart</h5>' +
        '</div>' +
        '<div class="modal-body">' +
        '<table class="table table-hover table-responsive" id="' + idCartTable + '"></table>' +
        '</div>' +
        '<div class="modal-footer">' +
        '<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>' +
        '<button type="button" class="btn btn-primary" id="' + idCheckoutCart + '">Checkout</button>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>'
      );
    }

    let drawTable = function(){
      let $cartTable = $("#" + idCartTable);
      $cartTable.empty();

      let products = ProductManager.getAllProducts();
      $.each(products, function(){
        let total = this.quantity * this.price;
        $cartTable.append(
          '<tr title="' + this.summary + '" data-id="' + this.id + '" data-price="' + this.price + '">' +
          '<td class="text-center"><img style="width:60px" src="' + this.image + '"/></td>' +
          '<td>' + this.name + '</td>' +
          '<td title="Unit Price">$' + this.price + '</td>' +
          '<td title="Quantity"><input type="number" min="1" style="width: 70px;" class="' + classProductQuantity + '" value="' + this.quantity + '"/></td>' +
          '<td title="Total" class="' + classProductTotal + '">$' + total + '</td>' +
          '<td title="Remove from Cart" class="text-center" style="width: 30px;"><a href="javascript:void(0);" class="btn btn-xs btn-danger ' + classProductRemove + '">X</a></td>' +
          '</tr>'
        );
      });

      $cartTable.append(products.length ?
        '<tr>' +
        '<td></td>' +
        '<td><strong>Total</strong></td>' +
        '<td></td>' +
        '<td></td>' +
        '<td><strong id="' + idGrandTotal + '">$</strong></td>' +
        '<td></td>' +
        '</tr>'
        : '<div class="alert alert-danger" role="alert" id="' + idEmptyCartMessage + '">Your cart is empty</div>'
      );

      let discountPrice = options.getDiscountPrice(products);
      if(discountPrice !== null) {
        $cartTable.append(
          '<tr style="color: red">' +
          '<td></td>' +
          '<td><strong>Total (including discount)</strong></td>' +
          '<td></td>' +
          '<td></td>' +
          '<td><strong id="' + idDiscountPrice + '">$</strong></td>' +
          '<td></td>' +
          '</tr>'
        );
      }

      showGrandTotal(products);
      showDiscountPrice(products);
    }
    let showModal = function(){
      drawTable();
      $("#" + idCartModal).modal('show');
    }
    let updateCart = function(){
      $.each($("." + classProductQuantity), function(){
        let id = $(this).closest("tr").data("id");
        ProductManager.updatePoduct(id, $(this).val());
      });
    }
    let showGrandTotal = function(products){
      let total = 0;
      $.each(products, function(){
        total += this.quantity * this.price;
      });
      $("#" + idGrandTotal).text("$" + total);
    }
    let showDiscountPrice = function(products){
      $("#" + idDiscountPrice).text("$" + options.getDiscountPrice(products));
    }

    /*
    EVENT
    */
    if(options.affixCartIcon) {
      let cartIconBottom = $cartIcon.offset().top * 1 + $cartIcon.css("height").match(/\d+/) * 1;
      let cartIconPosition = $cartIcon.css('position');
      $(window).scroll(function () {
        if ($(window).scrollTop() >= cartIconBottom) {
          $cartIcon.css('position', 'fixed').css('z-index', '999').addClass(classAffixMyCartIcon);
        } else {
          $cartIcon.css('position', cartIconPosition).css('background', 'inherit').removeClass(classAffixMyCartIcon);
        }
      });
    }

    $cartIcon.click(showModal);

    $(document).on("input", "." + classProductQuantity, function () {
      let price = $(this).closest("tr").data("price");
      let id = $(this).closest("tr").data("id");
      let quantity = $(this).val();

      $(this).parent("td").next("." + classProductTotal).text("$" + price * quantity);
      ProductManager.updatePoduct(id, quantity);

      $cartBadge.text(ProductManager.getTotalQuantityOfProduct());
      let products = ProductManager.getAllProducts();
      showGrandTotal(products);
      showDiscountPrice(products);
    });

    $(document).on('click', "." + classProductRemove, function(){
      let $tr = $(this).closest("tr");
      let id = $tr.data("id");
      $tr.hide(500, function(){
        ProductManager.removeProduct(id);
        drawTable();
        $cartBadge.text(ProductManager.getTotalQuantityOfProduct());
      });
    });

    $("#" + idCheckoutCart).click(function(){
      let products = ProductManager.getAllProducts();
      if(!products.length) {
        $("#" + idEmptyCartMessage).fadeTo('fast', 0.5).fadeTo('fast', 1.0);
        return ;
      }
      updateCart();
      options.checkoutCart(ProductManager.getAllProducts());
      ProductManager.clearProduct();
      $cartBadge.text(ProductManager.getTotalQuantityOfProduct());
      $("#" + idCartModal).modal("hide");
    });

    $(document).on('keypress', "." + classProductQuantity, function(evt){
      if(evt.keyCode == 38 || evt.keyCode == 40){
        return ;
      }
      evt.preventDefault();
    });
  }


  let MyCart = function (target, userOptions) {
    /*
    PRIVATE
    */
    let $target = $(target);
    let options = OptionManager.getOptions(userOptions);
    let $cartIcon = $("." + options.classCartIcon);
    let $cartBadge = $("." + options.classCartBadge);

    /*
    EVENT
    */
    $target.click(function(){
      options.clickOnAddToCart($target);

      let id = $target.data('id');
      let name = $target.data('name');
      let summary = $target.data('summary');
      let price = $target.data('price');
      let quantity = $target.data('quantity');
      let image = $target.data('image');

      ProductManager.setProduct(id, name, summary, price, quantity, image);
      $cartBadge.text(ProductManager.getTotalQuantityOfProduct());
    });

  }


  $.fn.myCart = function (userOptions) {
    loadMyCartEvent(userOptions);
    return $.each(this, function () {
      new MyCart(this, userOptions);
    });
  }


})(jQuery);
