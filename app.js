'use strict';

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const playList = $('.playlist');
const dashboardImg = $('.dashboard__img-container');

const app = {
    songs: [
        {
            title:'Hoa Hai Duong',
            singer:'Jack',
            imgUrl:'./images/hoa-hai-duong.jpeg',
            audio:'./audio/hoa-hai-duong.mp3'
        },
    
        {
            title:'Thien Dang',
            singer:'Wowwy & Jolipoli',
            imgUrl:'./images/thien-dang.jpeg',
            audio:'./audio/thien-dang.mp3'
        },
    
        {
            title:'Roi Toi Luon',
            singer:'Nal',
            imgUrl:'./images/roi-toi-luon.jpeg',
            audio:'./audio/roi-toi-luon.mp3'
        },
    
        {
            title:'Sau Hong Gai',
            singer:'G5R Squad',
            imgUrl:'./images/sau-hong-gai.jpeg',
            audio:'./audio/sau-hong-gai.mp3'
        },
    
        {
            title:'Thuong Nhau Toi Ben',
            singer:'Nal',
            imgUrl:'./images/thuong-nhau-toi-ben.jpeg',
            audio:'./audio/thuong-nhau-toi-ben.mp3'
        },
    
        {
            title:'Khue Moc Lang',
            singer:'Huong Ly',
            imgUrl:'./images/khue-moc-lang.jpeg',
            audio:'./audio/khue-moc-lang.mp3'
        }
    ],



    /****************** HANDLE EVENTS ******************/
    handleScroll(){
        let lastScrollTop = 0;

        const initialImgWidth = dashboardImg.offsetWidth;
        let currentImageWidth = initialImgWidth;
        
        document.addEventListener('scroll', function(){
            const currentScrollTop = window.scrollY || document.documentElement.scrollTop;

            if (currentScrollTop > lastScrollTop) {
                // down scroll code
                currentImageWidth -= currentScrollTop - lastScrollTop;
                
            } else {
                // up scroll code
                currentImageWidth += lastScrollTop - currentScrollTop;
            }

            dashboardImg.style.width = `${currentImageWidth}px`
            dashboardImg.style.opacity = currentImageWidth / initialImgWidth;
            
            // fix negative scroll offset in mobile devices
            lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop;
        })
    },
    
    handleEvents(){
        // handle scroll event on document
        this.handleScroll()
    },

    /****************** RENDER ******************/
    render(){

        const htmls = this.songs.map(s => {
            return `
            <li class="song">
                <img src="${s.imgUrl}" alt="${s.title}" class="song__thumbnail">

                <div class="song__body">
                    <h2 class="song__name">${s.title}</h2>
                    <p class="song__singer">${s.singer}</p>
                </div>

                <button class="song__ellipsis">
                    <i class="fa-solid fa-ellipsis"></i>
                </button>
            </li>
            `
        }).join('')

        playList.innerHTML = htmls

    },

    start(){
        this.handleEvents()
        this.render()
    }
}

app.start()