/**
 * Created by öÎ on 2016/4/14.
 */
$ = function( el ){ return document.querySelector( el ) }
var radio_array = document.getElementsByName("Student");
var de_options_array = document.getElementsByName("de_options");
var input_form = $("#input_form");
var school_name = $("#school_name");
var company_name = $("#company_name");
var select_options = $("#select_options");
company_name.style.display = "none";

var select_options_cnt = 0;

select_options.addEventListener("click",
    function( ev ){
        select_options_cnt ++;
        if( select_options_cnt % 2 == 0 ){
            for( var i = 0 ; i < de_options_array.length ; i ++ ){
                de_options_array[ i].style.display = "none";
            }
            de_options_array[ select_options.value ].style.display = "inline-block";
        }
    },
    false);

input_form.addEventListener("click",function(ev){
        if(ev.target == radio_array[0]){
            school_name.style.display = "block";
            company_name.style.display="none";
        }
        else if( ev.target == radio_array[1] ){
            school_name.style.display = "none";
            company_name.style.display="block";
        }
    },false)