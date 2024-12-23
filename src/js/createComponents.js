export function createArticleItem(data) {
    return $( `<li class="achievements__item item">
                    <img src="${data.img}"  loading="lazy" alt="" class="item__img">
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


export function createBear({index: num, active=true, zindex = 0}) {
    return $( 
        ` <picture class="banner__img img hero-bear hero-bear${num} ${!active ? 'transparent' : ''}" style="z-index: ${zindex}">
            <source class="img__source" srcset="./img/mobile/hero-bear${num}.webp" loading="lazy" media="(max-width: 767px)" type="image/webp" />
            <source class="img__source" srcset="./img/mobile/hero-bear${num}.png" loading="lazy" media="(max-width: 767px)" type="image/jpeg />
            <source class="img__source" srcset="./img/small_tablet/hero-bear${num}.webp" loading="lazy" media="(max-width: 1023px)" type="image/webp" />
            <source class="img__source" srcset="./img/small_tablet/hero-bear${num}.png" loading="lazy" media="(max-width: 1023px)" type="image/jpeg />
            <source class="img__source" srcset="./img/tablet/hero-bear${num}.webp" loading="lazy" media="(max-width: 1399px)" type="image/webp" />
            <source class="img__source" srcset="./img/tablet/hero-bear${num}.png" loading="lazy" media="(max-width: 1399px)" type="image/jpeg />
            <source class="img__source" srcset="./img/desktop/hero-bear${num}.webp" loading="lazy" type="image/webp" />
            <img class="img__source" src="./img/desktop/hero-bear${num}.png" loading="lazy" alt="Медведь ${num}" />
        </picture>`);
};


export function createDropdownBtns({title, index, active=false, actionOnClick, actionOnRemoveClick}) {
    const btn =  $(`
        <button class="list__item btn list-btn  bear${index} ${!active ? 'gray' : ''}">${title}  <button class="delete-btn ${active ? 'active' : ''}"></button>
           
        </button>`
    );
    btn.on('click', (e)=> actionOnClick(e, index));
    btn.find('.delete-btn').on('click', (e)=> actionOnRemoveClick(e, index));

    return btn;
};
