import { titles } from "./data";
import { updateDirections } from "./render";

let activeTitles = titles;

export const actionOnClick = (event, index) => {
    clickAction(event, index, true);
}

export const actionOnRemoveClick = (event, index) => {
    clickAction(event, index, false);
}

export const clickAction = (event, index, activeStatus) => {
    event.stopPropagation();
    activeTitles = activeTitles.map((e, i) => {
        if(index == 0) {
           return {...e, active: activeStatus};
        } else if(index === i) {
           return {...e, active: activeStatus};
        }
           return e; 
    });

    updateDirections(activeTitles);
}

export const activeteDorpdown = (event)=>{
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

export function dropDownClick() {
    $('.dropdown-btn').on('click', activeteDorpdown);
}