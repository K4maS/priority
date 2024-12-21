import '../styles/styles.scss';
import $ from 'jquery';
import { titles, articles } from './data';

function createBear(num, zindex = 0) {
    return $( `<picture class="banner__img img hero-bear hero-bear${num}" style="z-index: ${zindex}">
        <source class="img__source" srcset="./img/mobile/hero-bear${num}.png" media="(max-width: 374px)" />
        <source class="img__source" srcset="./img/small_tablet/hero-bear${num}.png" media="(max-width: 1023px)" />
        <source class="img__source" srcset="./img/tablet/hero-bear${num}.png" media="(max-width:1399px)" />
        <img class="img__source" src="./img/desktop/hero-bear${num}.png" alt="Медведь ${num}" />
    </picture>`);
};

function createArticleItem(data) {
    return $( `<li class="achievements__item item">
                    <img src="${data.img}" alt="" class="item__img">
                    <div class="item__text-block">
                    <h3 class="item__title sub-title">
                         ${data.title}
                    </h3>
                    <p class="item__descr">
                         ${data.descr}
                    </p>
                        <div class="item__btn-block">
                            <button class="item__btn btn">
                                Забота о каждом нуждающемся
                            </button>
                            <button class="btn gray item__likes ${data.likeStatus} ${data.color} ${data.likeStatus ? 'liked': ''}">
                               ${data.likes > 0 ? ` <span>${data.likes}</span>` : ''}
                            </button>
                        </div>
                    </div>
                </li>`
            );
};

const activeElems = [];

function createDropdownBtns({title, index}) {
    const btn =  $(`
        <button class="list__item btn gray bear${index}">${title}  <button class="delete-btn"></button>
           
        </button>`
    );
    btn.on('click', (e)=> {
        $('.hero-bear').each((ind, elem)=> {
            const jElem = $(elem);
            jElem.removeClass('transporent');
            if(index == 0) {
                jElem.removeClass('transporent');
            }
            else {
                if(!activeElems.includes(index)){
                    activeElems.push(index);
                } 
                if(!activeElems.includes(ind)){
                    jElem.addClass('transporent');
                }
            }
        });
        btn.find('.delete-btn').addClass('active');
        const newBtn = $(e.target).removeClass('gray').append('');
        console.log(newBtn)
        // $('.banner__btn-block').append(newBtn);
    })

    $('.delete-btn').on('click', )

    return btn;
};

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

titles.forEach(({zindex, title}, index)=>{
    if(index !== 0) {
         $('.bears_place').append(createBear(index, zindex));
    }
   
    $('.directions-list').append(createDropdownBtns({title, index}));
});

let i = 3;
while(i > 0) {
    i--;
    articles.forEach((elem, index)=>{
        $('.achievements-list').append(createArticleItem(elem));
   });
}


$('.dropdown-btn').on('click', activeteDorpdown);