$(document).ready(function(){
    $.get('/state/fetch_all_state',function(data){
        //alert(JSON.stringify(data.result))
        data.result.map((item)=>{
        $('#stateid').append($('<option>').text(item.statename).val(item.stateid))
        })
    })
    $('#stateid').change(function(){

        $.get('/state/fetch_all_city',{stateid:$('#stateid').val()},function(data){
            $('#cityid').empty()
            $('#cityid').append($('<option>').text('City'))
            data.result.map((item)=>{
            $('#cityid').append($('<option>').text(item.cityname).val(item.cityid))
            })
    })
    })  
    $('#cityid').change(function(){

        $.get('/state/fetch_all_cinema',{cityid:$('#cityid').val()},function(data){
            $('#cinemaid').empty()
            $('#cinemaid').append($('<option>').text('Cinema'))
            data.result.map((item)=>{
            $('#cinemaid').append($('<option>').text(item.cinemaname).val(item.cinemaid))
            })
    })
    })  
 
    $('#cinemaid').change(function(){

        $.get('/state/fetch_all_screen',{cinemaid:$('#cinemaid').val()},function(data){
            $('#screenid').empty()
            $('#screenid').append($('<option>').text('Screen'))
            data.result.map((item)=>{
            $('#screenid').append($('<option>').text(item.screenname).val(item.screenid))
            })
    })
    })  
    $('#picture').change(function(e){
  
        $('#movieimage').attr('src',URL.createObjectURL(e.currentTarget.files[0]))
    })

    
    })
