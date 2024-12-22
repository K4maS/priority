import '../styles/styles.scss';
import $ from 'jquery';
import { titles, articles } from './data';
import { createArticleItem, createBear, createDropdownBtns } from './createComponents';

const activeElems = [];
let activeTitles = titles;

const activeteDorpdown = (event)=>{
    const list = $(event.target).parent().find('.directions-list');
    const dropdownArrow = $(event.target).find('.dropdown-arrow');
    const blackout = $('.blackout');
 
    list.toggleClass('active');
    dropdownArrow.toggleClass('active');
    blackout.toggleClass('active');

    blackout.on('click', ()=> {
        list.removeClass('active');
        dropdownArrow.removeClass('active');
        blackout.removeClass('active');
    });
};

const actionOnClick = (e, index) => {
    activeTitles = activeTitles.map((e, i) => {
        if(index == i) {
            e.active = true;
        }
        else if(index == 0) {
            e.active = true;
        }
        return e;
    });
    updateDirections(activeTitles);
}

const actionOnRemoveClick = (e, index) => {
    let newObj = activeTitles.map((e, i) => {
    
        if(index == i) {
            e.active = false;
        }
        else if(index == 0) {
            e.active = true;
        }

        return e;
    });
    console.log(newObj);

    updateDirections(newObj);
}



const updateDirections = (activeTitles, type = 'add') => {
    let activeBears = activeTitles.filter((elem)=> elem.active === true).map((elem)=> elem.id );
    $(`.hero-bear`).addClass('transporent');
    $(`.directions-list .list-btn`).addClass('gray');
    $(`.directions-list  .list-btn .delete-btn`).removeClass('active');
    $('.directions-active-list').empty();

    titles.forEach(({title, active}, index )=>{
    // let activeBearsStatus = activeBears.length > 0 ? active : true;

            if(activeBears.includes(index)) {
                if(index !== 0) {
                    $(`.hero-bear${index}`).removeClass('transporent');
                }
                $(`.bear${index}`).removeClass('gray');
                $(`.bear${index} .delete-btn`).addClass('active');
                $('.directions-active-list').append(createDropdownBtns({title, index, active, actionOnClick, actionOnRemoveClick}));

            }
    });
}



const mountDirections = (titles) => {
    $('.directions-list').empty();
    let activeBears = activeTitles.filter((elem)=> elem.active === true);

    titles.forEach(({zindex, title, active}, index)=>{
    let activeBearsStatus = activeBears.length > 0 ? active : true;
        
    if(index !== 0) {
            $(`.hero-bear${index}`).remove();
            $('.bears_place').append(createBear({index, zindex, activeBearsStatus}));
    }
    $('.directions-list').append(createDropdownBtns({title, index, active, actionOnClick, actionOnRemoveClick}));
    });
}


function renderAchievementsList () {
    let i = 3;
    while(i > 0) {
        i--;
        articles.forEach((elem, index)=>{
            $('.achievements-list').append(createArticleItem(elem));
    });
    }
}

mountDirections(activeTitles);
renderAchievementsList();

$('.dropdown-btn').on('click', activeteDorpdown);
