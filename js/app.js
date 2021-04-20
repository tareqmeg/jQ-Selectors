'use strict';

let myArr = [];
function Horns (horns){
  this.image_url = horns.image_url;
  this.title = horns.title;
  this.description = horns.description;
  this.keyword = horns.keyword;
  this.horns = horns.horns;

}

Horns.prototype.render = function (){
  let hornClone = $('.photo-template').clone();
  if(!myArr.includes(this.keyword)){
    myArr.push(this.keyword);
    let option=document.createElement('option');
    option.textContent=this.keyword;
    option.setAttribute('class',this.keyword);
    $('select').append(option);
  }
  hornClone.find('h2').text(this.title);
  hornClone.find('img').attr('src', this.image_url);
  hornClone.find('p').text(this.description);
  hornClone.attr('class', this.keyword);
  $('main').append(hornClone);


};

Horns.readjson = () =>{
  const ajaxSettings = {
    method: 'get',
    type: 'json'
  };

  $.ajax('./data/page-1.json', ajaxSettings)
    .then(data =>{
      data.forEach(item =>{
        let horn = new Horns(item);
        horn.render();


      });

    });

};
$('select').on('change',function(event){
  event.preventDefault();
  let select=$(this).children('option:selected').val();
  
  
  $('main').children().addClass('hide');
  $(`.${select}`).removeClass('hide');
});
$(() => Horns.readjson());






