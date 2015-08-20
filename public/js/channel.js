$(function(){
    var max_fields      = 10; //maximum input boxes allowed
    var wrapper         = $(".input_fields_wrap"); //Fields wrapper
    var add_button      = $(".add_field_button"); //Add button ID

    var x = 1; //initlal text box count
    $(add_button).click(function(e){ //on add input button click DH IS HERE
        e.preventDefault();
        if(x < max_fields){ //max input box allowed
            x++; //text box increment
            // $(wrapper).append('<div><input type="text" class="form-control" placeholder="Interest" name="term"/><a href="#" class="btn btn-default remove_field">-</a></div>');
            $(wrapper).append('<div class="col-md-4"><span><label>Search Term</label><input type="text" class="form-control" placeholder="Search Term (word, @tag, #tag)" name="term"></span></div><div class="col-md-7"><span><label>Term: Image Url (optional)</label><input type="text" class="form-control" placeholder="Image URL for search Term" name="image_url"></span><a href="#" class="btn btn-default remove_field">-</a></div>');
            // $('#termCount').valu
        }
    });

    $(wrapper).on("click",".remove_field", function(e){ //user click on remove text
        e.preventDefault(); $(this).parent('div').remove(); x--;
    })
});