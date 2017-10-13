$(document).ready(function(){
  var output=$('#output');
  var name=" ";

  function SoundCloud (title,permalink_url,id){
   this.title= title;
   this.permalink_url=permalink_url;
   this.id= id;
   this.render=function (){
     output.append($(`
       <li id=${this.id}>${this.title}<a href=${this.permalink_url}></li>
       `)
   )}
 }
//record typing for search
  $('#inputbox').keyup(function(){
    searchingforshit = $('input:text').val()})
//search
  $('#searchbutton').click(function(){
    $.ajax({
      url: "https://api.soundcloud.com/tracks?q=" + searchingforshit  +
      "&format=json&client_id=fd4e76fc67798bfa742089ed619084a6",
      success: function(response){
        console.log(response);
        // this is to test
        for(var i=0;i<response.length;i++){
          var myshit=new SoundCloud(response[i].title,response[i].permalink_url,response[i].id)
          myshit.render()}
      },
      error: function(error){
        $('#error').text('song not found')}
      })
  })

  var whereami = 0
 

//Nextbuttons
  $('#nextbutton').click(function(){
    if(whereami==$('#output li').length){
      SC.stream('/tracks/' + $('#output li')[0].id)
        .then(function(player){
          player.play()})
    whereami=0
    }else{
      SC.stream('/tracks/' + $('#output li')[whereami++].id)
        .then(function(player){
          player.play()})
      }
    })
//previous button
    $('#previousbutton').click(function(){
      if(whereami==0){
      var whereami2 = $('#output li').length-1
        SC.stream('/tracks/' + $('#output li')[whereami2].id)
          .then(function(player){
            player.play()})
      whereami=$('#output li').length-1
      }else{
        SC.stream('/tracks/' + $('#output li')[whereami--].id)
          .then(function(player){
            player.play()})
      }
    })



})//docready closer
