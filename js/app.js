'use strict';

let myArr = [];
function Horns (horns){
  this.image_url = horns.image_url;
  this.title = horns.title;
  this.description = horns.description;
  this.keyword = horns.keyword;
  this.horns = horns.horns;

}

Horns.prototype.hoenRender = function (){
  // let hornClone = $('.photo-template').clone();
  // if(!myArr.includes(this.keyword)){
  //   myArr.push(this.keyword);
  //   let option=document.createElement('option');
  //   option.textContent=this.keyword;
  //   option.setAttribute('class',this.keyword);
  //   $('select').append(option);
  // }
  // hornClone.find('h2').text(this.title);
  // hornClone.find('img').attr('src', this.image_url);
  // hornClone.find('p').text(this.description);
  // hornClone.attr('class', this.keyword);
  // $('main').append(hornClone);

  let template = $('#photo-template').html();
  let hornsMergedTemplate = Mustache.render(template,this);
  $('#horn-photo').append(hornsMergedTemplate);

  let template2 = $('#list-template').html();
  let hornoption = Mustache.render(template2,this);
  if( !myArr.includes(this.keyword)){
    myArr.push(this.keyword);
    $('#list').append(hornoption);
  }


};


/*-------reading files (page-1.json and page-2.json)----------- */


Horns.readjson1 = () =>{
  const ajaxSettings = {
    method: 'get',
    type: 'json'
  };

  $.ajax('./data/page-1.json', ajaxSettings)
    .then(data =>{
      data.forEach(item =>{
        let horn = new Horns(item);
        horn.hoenRender();


      });

    });

};
Horns.readjson2 = () =>{
  const ajaxSettings = {
    method: 'get',
    type: 'json'
  };

  $.ajax('./data/page-2.json', ajaxSettings)
    .then(data =>{
      data.forEach(item =>{
        let horn = new Horns(item);
        horn.hoenRender();


      });

    });

};


$(() => Horns.readjson1());
$('option').next().remove();
myArr=[];

/*-------Filter----------- */


$('select').on('change',() =>{
  let selectedOption = $('select').children('option:selected').val();
  console.log(selectedOption);
  if( selectedOption === 'default'){
    $('div').show();
  }else{
    $('div').hide();
    $(`.${selectedOption}`).show();
  }

});


/*-------pagination----------- */
$('#page2').on('click', function (e){
  e.preventDefault();
  $('#horn-photo').children().remove();
  $('option').next().remove();
  $(() => Horns.readjson2());
  // $('#page2').off('click');
});


$('#page1').on('click', function (e){
  e.preventDefault();
  $('#horn-photo').children().remove();
  $('option').next().remove();
  myArr=[];
  $(() => Horns.readjson1());
});











