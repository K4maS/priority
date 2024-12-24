import { createArticleItem, createBear, createDropdownBtns } from './createComponents';
import {  actionOnClick, actionOnRemoveClick } from './actions';
import {articles} from './data';

export function renderAchievementsList () {
    let i = 3;
    while(i > 0) {
        i--;
        articles.forEach((elem)=>{
            $('.achievements-list').append(createArticleItem(elem));
    });
    }
}

export const updateDirections = (titles) => {
    let activeBears = titles.filter((elem)=> elem.active === true).map((elem)=> elem.id );
        
    if(activeBears.length > 0){
        $(`.hero-bear`).addClass('transporent');
    } else {
        $(`.hero-bear`).removeClass('transporent');
    }
    $(`.directions-list .list-btn`).addClass('gray');
    $(`.directions-list  .list-btn .delete-btn`).removeClass('active');
    $('.directions-active-list').empty();

    titles.forEach(({title}, index )=>{
            if(activeBears.includes(index)) {
                if(index !== 0) {
                    $(`.hero-bear${index}`).removeClass('transporent');
                }
                $(`.bear${index}`).removeClass('gray');
                $(`.bear${index} .delete-btn`).addClass('active');
                $('.directions-active-list').append(createDropdownBtns({title, index, active: true, actionOnClick, actionOnRemoveClick}));
            }
    });
}


export const mountDirections = (titles) => {
    
    let activeBears = titles.filter((elem)=> elem.active === true);
    
    titles.forEach(({zindex, title, active}, index)=>{
        let activeBearsStatus = activeBears.length > 0 ? active : true;
        if(index !== 0) {
                $('.bears_place').append(createBear({index, zindex, activeBearsStatus}));
        }
        $('.directions-list').append(createDropdownBtns({title, index, active, actionOnClick, actionOnRemoveClick}));
    });
}
