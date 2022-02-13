'use strict';

const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const player = $('.player');
const playList = $('.playlist');
const imageContainer = $('.dashboard__img-container')
const songImg = $('.dashboard__img')
const songTitle = $('.dashboard__title')
const playBtn = $('.dashboard__toggle-play-pause')
const nextBtn = $('.dashboard__next-btn')
const prevBtn = $('.dashboard__prev-btn')
const replayBtn = $('.dashboard__replay-btn')
const autoNextSongBtn = $('.dashboard__shuffle-btn')
const timeSeekingSlider = $('.dashboard__slider')
const audio = $('.dashboard__audio')

const app = {
    currentIndex:  0,
    canPlayThrough: false,
    canReplay: false,
    songs: [
        {
            title:'Roi Toi Luon',
            singer:'Nal',
            imgUrl:'./images/roi-toi-luon.jpeg',
            audio:'./audio/roi-toi-luon.mp3'
        },

        {
            title:'Thien Dang',
            singer:'Wowwy & Jolipoli',
            imgUrl:'./images/thien-dang.jpeg',
            audio:'./audio/thien-dang.mp3'
        },

        {
            title:'Hoa Hai Duong',
            singer:'Jack',
            imgUrl:'./images/hoa-hai-duong.jpeg',
            audio:'./audio/hoa-hai-duong.mp3'
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
    
    loadCurrentSong(){
        const currentSong = this.songs[this.currentIndex]
        songImg.src = currentSong.imgUrl
        songTitle.textContent = currentSong.title
        audio.src = currentSong.audio
        audio.play()
    },

    /****************** HANDLE EVENTS ******************/
    handleEvents(){
        // handle scroll event on document
        const initialImgWidth = imageContainer.offsetWidth
        document.addEventListener('scroll', function(){
            const scrollTop = window.scrollY || document.documentElement.scrollTop
            const newWidth = initialImgWidth - scrollTop

            imageContainer.style.width = `${newWidth}px`
            imageContainer.style.opacity = newWidth / initialImgWidth
        })


        // handle play and pause audio
        playBtn.addEventListener('click', (e) => {
            if (e.target.closest('.icon-play')) {
                audio.play()
            } else{    
                audio.pause()
            }   
        })


        // display play btn
        audio.addEventListener('play', () => {
            player.classList.add('playing')
        })


         // display pause btn
         audio.addEventListener('pause', () => {
            player.classList.remove('playing')
        })


        // handle time update
        audio.addEventListener('timeupdate', () => {
            if(audio.duration > 0){
                timeSeekingSlider.value = audio.currentTime / audio.duration * 100
            }
        })


        // handle slider value change
        timeSeekingSlider.addEventListener('input', () => {
            audio.currentTime = timeSeekingSlider.value * audio.duration / 100
        })


        // handle next song
        nextBtn.addEventListener('click', () => {
            if (this.currentIndex < this.songs.length - 1) {
                this.currentIndex++
            } else {
                this.currentIndex = 0
            }
            this.loadCurrentSong()
        })


         // handle prev song
        prevBtn.addEventListener('click', () => {
            if (this.currentIndex === 0) {
                this.currentIndex = this.songs.length - 1
            } else {
                this.currentIndex--
            }

            this.loadCurrentSong()
        })

        // handle replay
        replayBtn.addEventListener('click', () => {
            replayBtn.classList.toggle('active')
            autoNextSongBtn.classList.remove('active')
            if (this.canReplay) {
                this.canReplay = false           
            } else {
                this.canReplay = true
                this.canPlayThrough = false
            }
            audio.loop = this.canReplay
        })

        // handle playing next song automatically
        autoNextSongBtn.addEventListener('click', () => {
            autoNextSongBtn.classList.toggle('active')
            replayBtn.classList.remove('active')
            if (this.canPlayThrough) {
                this.canPlayThrough = false           
            } else {
                this.canPlayThrough = true
                this.canReplay = false
                audio.loop = false
            }
        })

        // handle audio ended
        audio.addEventListener('ended', () => {
            // if the current song is the last, go back to the first song
            if (this.currentIndex < this.songs.length - 1  
                && this.canPlayThrough) {   
                this.currentIndex++
            }
            else {
                this.currentIndex = 0
            }
            this.loadCurrentSong()
        })

    },

    /****************** RENDER SONGS ******************/
    renderSongs(){

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

    /****************** START ******************/
    start(){
        this.renderSongs()

        this.loadCurrentSong()

        this.handleEvents()
    }
}

app.start()