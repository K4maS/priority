import '../styles/styles.scss';
import $ from 'jquery';
import { titles, articles } from './data';
import { createArticleItem, createBear, createDropdownBtns } from './createComponents';
import { gsap } from 'gsap';

let activeTitles = titles;

document.addEventListener("DOMContentLoaded", function() {
    gsap.fromTo('.directions-list',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.2 }
    );
});

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

const clickAction = (event, index, activeStatus) => {
    event.stopPropagation();
    activeTitles = activeTitles.map((e, i) => {
        if(index == 0) {
           return {...e, active: activeStatus};
        } else if(index === i) {
           return {...e, active: activeStatus};
        }
           return e; 
    });
    console.log(activeTitles);
    updateDirections(activeTitles);
}

const actionOnClick = (event, index) => {
    clickAction(event, index, true);
}

const actionOnRemoveClick = (event, index) => {
    clickAction(event, index, false);
}



const updateDirections = (activeTitles) => {
    let activeBears = activeTitles.filter((elem)=> elem.active === true).map((elem)=> elem.id );
    $(`.hero-bear`).addClass('transporent');
    $(`.directions-list .list-btn`).addClass('gray');
    $(`.directions-list  .list-btn .delete-btn`).removeClass('active');
    $('.directions-active-list').empty();


    titles.forEach(({title, active}, index )=>{
            let activeBearsStatus = activeBears.length > 0 ? active : true;
            console.log(activeBearsStatus)
            if(activeBears.includes(index)) {
                if( activeBearsStatus || index !== 0) {
                    $(`.hero-bear${index}`).removeClass('transporent');
                }
                $(`.bear${index}`).removeClass('gray');
                $(`.bear${index} .delete-btn`).addClass('active');
                $('.directions-active-list').append(createDropdownBtns({title, index, active: true, actionOnClick, actionOnRemoveClick}));
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
        articles.forEach((elem)=>{
            $('.achievements-list').append(createArticleItem(elem));
    });
    }
}

mountDirections(activeTitles);
renderAchievementsList();

$('.dropdown-btn').on('click', activeteDorpdown);
