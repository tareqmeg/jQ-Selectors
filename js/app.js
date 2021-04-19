'use strict';


function Horns (horns){
  this.image_url = horns.image_url;
  this.title = horns.title;
  this.description = horns.description;
  this.keyword = horns.keyword;
  this.horns = horns.horns;

}

Horns.prototype.render = function (){
  let option = document.createElement('option');
  option.textContent=this.keyword;
  option.setAttribute('id',this.keyword);
  $('select').append(option);
  let hornClone = $('#photo-template').clone();
  $('main').append(hornClone);
  hornClone.find('h2').text(this.title);
  hornClone.find('img').attr('src', this.image_url);
  hornClone.find('p').text(this.description);

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
        console.log(horn);
        horn.render();
      });
    });
};

$(() => Horns.readjson());
